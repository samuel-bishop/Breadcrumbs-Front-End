import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController, Platform, ModalController } from 'ionic-angular';
import { addeventPage } from '../addevent/addevent';
import { addcontactPage } from '../addcontact/addcontact';
import { vieweventsPage } from '../viewevents/viewevents';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { editcontactPage } from '../editcontact/editcontact';
import { LoginPagePage } from '../LoginPage/LoginPage';
import { Event } from '../../datastructs';
import { LatLng, GoogleMap } from '@ionic-native/google-maps';
import { viewEventPage } from '../viewEvent/viewEvent';
import { editAccountPage } from '../editAccount/editAccount';
import { LocalNotifications, Network } from 'ionic-native';
import { favoriteEventsPage } from '../favoriteEvents/favoriteEvents';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [httprequest]
})

/* Home Page / Dashboard
 * This page is designed to display information to the 
 * user on their currently active event and allow them to 
 * access other pages
 */

export class HomePage {
  /* Event Members */
  username: any;
  EventName: any;
  EventDescription: any;
  EventParticipants: any;
  EventEndDate: any;
  EventStartDate: any;
  EventEndDateFormatted: any;
  EventStartDateFormatted: any;
  /* Variables */
  activeEvent: any;
  favoriteEvents: any;
  favoriteEventsExist: any;
  inactiveEvents: any; //A list of inactive events
  userID: any = 0; //The userid of the currently signed in user
  newEventSubmit: boolean; //A boolean to check if an event has recently been submitted
  CurrentEvent: Event; //A local store of the newly created event
  CurrentEventExists: boolean; //A boolean for the UI to know if theres an Active Event
  CurrentEventIsFavorited: boolean;
  FirstName: any;
  LastName: any;
  Email: any;
  PastEventExists: boolean;
  isMobile: boolean;
  gmap: GoogleMap;

  @ViewChild('EventMap') EventMapRef: ElementRef;

  //Constructor (called on page creation)
  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, private menu: MenuController, private platform: Platform, public loadingCtrl: LoadingController, public navCtrl: NavController, public request: httprequest, public storage: Storage) {
    
    //check if there is a network connection
    this.GetInactiveEvents();

    //check if the platform is mobile
    if (platform.is('mobile')) {
      this.isMobile = true;
      //if mobile, check permissions 
      LocalNotifications.hasPermission().then((granted) => {
        if (!granted) {
          LocalNotifications.registerPermission();
        }
      })


      
      // displays an alert on click of local notification
      //LocalNotifications.on("click", (notification, state) => {
      //  let alert = this.alertCtrl.create({
      //    title: "Notification Clicked",
      //    subTitle: "You just clicked the scheduled notification",
      //    buttons: ["OK"]
      //  });
      //  alert.present();
      //})
    }
  }

  public scheduleNotification() {
    if (this.CurrentEventExists) {
      LocalNotifications.schedule({
        title: `${this.CurrentEvent.EventName}`,
        text: `${this.CurrentEvent.EventEndDate}`, 
        at: new Date(new Date().getTime() + 5 * 1000)
      });
      }
  }

  ionViewWillLoad() {
    this.storage.get('user').then((user) => {
      this.username = user.UserName;
      this.FirstName = user.FirstName;
      this.LastName = user.LastName;
      this.Email = user.Email;
    });

    this.storage.get('CurrentEventExists').then((doesExists) => {
      if (doesExists == true) {
        this.CurrentEventExists = true;
        this.storage.get('activeEvent').then((ActiveEvent) => {
          this.CurrentEvent = ActiveEvent;
          this.EventName = this.CurrentEvent.EventName;
          this.EventDescription = this.CurrentEvent.EventDesc;
          this.EventParticipants = this.CurrentEvent.EventParticipants;
          this.EventEndDate = this.CurrentEvent.EventEndDate;
          this.EventStartDate = this.CurrentEvent.EventStartDate;
          let EndDate = new Date(this.EventEndDate);
          //this.EventEndDateFormatted = new Date(EndDate.getTime() - EndDate.getTimezoneOffset() * 60000);
          this.EventEndDateFormatted = this.FormatTime(EndDate);
          let StartDate = new Date(this.EventStartDate);
          this.EventStartDateFormatted = this.FormatTime(StartDate);
          //this.EventStartDateFormatted= new Date((StartDate.getTime() - StartDate.getTimezoneOffset() * 60000)).toISOString();

          this.storage.get('currentEventIsFavorited').then((bool) => {
            this.CurrentEventIsFavorited = bool;
          })
        })
      }
      else {
        this.GetActiveEvent();
      }
    });

    this.storage.get('favoriteEvents').then((favoriteEvents) => {
      this.favoriteEvents = [];
      if (favoriteEvents.length != 0) {
        for (let event of favoriteEvents) {
          if (event != null) {
            this.favoriteEvents.push(event);
            this.favoriteEventsExist = true;
          }
        }
      }
    }).catch(() => {
        this.favoriteEventsExist = false;
    });

  }

  GetActiveEvent() {
    this.request.RequestActiveEvent().then((data) => {
      let event = data['recordset'][0];
      if (event != undefined) {
        let EndDate = new Date(event.EndDate);
        let EndDateISO = new Date(EndDate.getTime() - EndDate.getTimezoneOffset() * 60000);
        let StartDate = new Date(event.EventStartDate);
        let StartDateISO = new Date((StartDate.getTime() - StartDate.getTimezoneOffset() * 60000)).toISOString();

        let newEvent = new Event(event.EventID,
          event.EventName,
          event.EventDescription,
          event.EventParticipants,
          //this.FormatTime(StartDateISO),
          //this.FormatTime(EndDateISO),
          event.EventStartDate,
          event.EndDate,
          new LatLng(event.StartLat, event.StartLon),
          new LatLng(event.EndLat, event.EndLon),
          true);
        newEvent.IsFavorite = event.IsFavorite;
        this.CurrentEventIsFavorited = event.IsFavorite;
        this.CurrentEvent = newEvent;
        this.EventName = this.CurrentEvent.EventName;
        this.EventDescription = this.CurrentEvent.EventDesc;
        this.EventParticipants = this.CurrentEvent.EventParticipants;
        this.EventEndDate = this.CurrentEvent.EventEndDate;
        this.CurrentEventIsFavorited = this.CurrentEvent.IsFavorite;
        this.storage.set('activeEvent', newEvent).then(() => {
          this.storage.set('CurrentEventExists', true);
          this.CurrentEventExists = true;
        }).catch(() => {
          this.storage.set('CurrentEventExists', false);
          this.CurrentEventExists = false;
        });
      }
      else { this.CurrentEventExists = false; }
    });
  }

  GetInactiveEvents() {
    this.request.RequestInactiveEvents().then((data) => {
      this.inactiveEvents = [];
      let dataset = data['recordset'];
      this.PastEventExists = true;
      for (let event of dataset) {
        let newEvent = new Event
          (event.EventID,
          event.EventName,
          event.EventDescription,
          event.EventParticipants,
          event.EventStartDate,
          event.EndDate,
          new LatLng(event.StartLat, event.Startlon), 
          new LatLng(event.EndLat, event.EndLon),
          false);
        this.inactiveEvents.unshift(newEvent);
      }
      this.storage.set('inactiveEvents', this.inactiveEvents).then(() => { this.PastEventExists = false;  });
    });
  }

  Refresh() {
    this.storage.remove('activeEvent');
    this.CurrentEventExists = false;
    this.GetActiveEvent();
  }

  FormatTime(datetime): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let year: string = (new Date(datetime).getFullYear()).toString();
    let month: string = monthNames[(new Date(datetime).getMonth())];
    let weekday: string = dayNames[(new Date(datetime).getDay())];
    let date: string = (new Date(datetime).getDate()).toString();
    let time: string = new Date(datetime).toISOString().slice(11, 16);
    let hourInt: number = parseInt(time.slice(0, 2));
    if (hourInt > 12) {
      hourInt -= 12;
      time = hourInt.toString() + time.slice(2) + ' PM';
    }
    else time = time + ' AM';
    if (time.startsWith('0')) time = time.slice(1);

    let result: string = weekday + ', ' + month + ' ' + date + ', ' + year + ' at ' + time;
    return result;
  }

  checkIn() {
    this.storage.set('EditEvent', false);
    this.storage.get('activeEvent').then((Event) => {
      this.storage.get('inactiveEvents').then((InactiveEvents) => {
        InactiveEvents.push(Event);
        this.request.CancelWatch(Event.EventID);
        this.storage.set('inactiveEvents', InactiveEvents);
        this.inactiveEvents = InactiveEvents;
      });
      this.request.DisableEvent(Event.EventID).then(() => {
        this.storage.set('CurrentEventExists', false).then(() => {
          this.CurrentEventExists = false;
        });
      });
    });
    LocalNotifications.cancelAll();
  }

  toggleExists() {
    if (this.CurrentEventExists) this.CurrentEventExists = false;
    else this.CurrentEventExists = true;
    this.storage.set('CurrentEventExists', this.CurrentEventExists);
    //location.reload();
  }

  addContact() {
    this.navCtrl.push(addcontactPage, {}, { animate: false });
  }

  editContacts() {
    this.navCtrl.push(editcontactPage, {}, { animate: false });
  }

  viewEvent(event) {
    this.storage.set('viewedEvent', event).then(() => {
      this.navCtrl.push(viewEventPage, {}, { animate: false });
    })
  }

  viewFavoriteEvents() {
    this.navCtrl.push(favoriteEventsPage);
  }

  viewPastEvents() {
    this.navCtrl.push(vieweventsPage, {}, { animate: false });
  }

  addEvent() {
    this.storage.set('EditEvent', false).then(() => {
      this.navCtrl.push(addeventPage, {}, { animate: false });
    })
  }

  editEvent() {
    this.storage.set('EditEvent', true).then(() => {
      this.navCtrl.push(addeventPage, {}, { animate: false });
    })
  }

  logout() {
    this.storage.clear().then(() => {
      this.storage.set('userID', 0);
    })
    this.navCtrl.setRoot(LoginPagePage);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  editAccount() {
    this.navCtrl.push(editAccountPage);

  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele.EventID != value.EventID;
    });
  }

  toggleBool(bool) {
    return (bool ? false : true);
  }

  favoriteEvent(event) {
    this.storage.get('activeEvent').then((currentEvent) => {
      if (event.EventID == currentEvent.EventID) {
        currentEvent.IsFavorite = this.toggleBool(currentEvent.IsFavorite);
        this.request.FavoriteEvent(currentEvent.EventID);
        this.storage.set('activeEvent', currentEvent);
        this.CurrentEventIsFavorited = this.toggleBool(this.CurrentEventIsFavorited);
        this.storage.set('currentEventIsFavorited', this.CurrentEventIsFavorited);
        this.CurrentEventIsFavorited ? this.favoriteEvents.push(this.CurrentEvent) : this.favoriteEvents = this.arrayRemove(this.favoriteEvents, this.CurrentEvent);
        this.storage.set('favoriteEvents', this.favoriteEvents);
      }
      else {
        this.request.FavoriteEvent(event.EventID);
        event.IsFavorite = this.toggleBool(event.IsFavorite);
        this.inactiveEvents = this.arrayRemove(this.inactiveEvents, event);
        this.inactiveEvents.push(event);
        event.IsFavorite ? this.favoriteEvents.push(event) : this.favoriteEvents = this.arrayRemove(this.favoriteEvents, event);
        if (this.favoriteEvents.length == 0) this.favoriteEventsExist = false;
        else this.favoriteEventsExist = true;
        this.storage.set('inactiveEvents', this.inactiveEvents);
        this.storage.set('favoriteEvents', this.favoriteEvents);
      }
    });
  }

}


