import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { addeventPage } from '../addevent/addevent';
import { addcontactPage } from '../addcontact/addcontact';
import { vieweventsPage } from '../viewevents/viewevents';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { Response, Request } from '@angular/http';
import { editeventPage } from '../editevent/editevent';
import { editcontactPage } from '../editcontact/editcontact';
import { LoginPagePage } from '../LoginPage/LoginPage';
import { Event } from '../../datastructs';
import { LatLng } from '@ionic-native/google-maps';
import { BCWorker } from '../../worker';
import { viewEventPage } from '../viewEvent/viewEvent';
import { isUndefined } from 'ionic-angular/umd/util/util';
import { editAccountPage } from '../editAccount/editAccount';

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
  PastEvent: any;
  PastEventName: any;
  PastEventDescription: any;
  PastEventParticipants: any;

  /* Variables */
  activeEvent: any;
  inactiveEvents: any; //A list of inactive events
  userID: any = 0; //The userid of the currently signed in user
  newEventSubmit: boolean; //A boolean to check if an event has recently been submitted
  CurrentEvent: Event; //A local store of the newly created event
  CurrentEventExists: boolean; //A boolean for the UI to know if theres an Active Event
  FirstName: any;
  LastName: any;
  Email: any;
    PastEventExists: boolean;

  //Constructor (called on page creation)
  constructor(public alertCtrl: AlertController, private menu: MenuController, public loadingCtrl: LoadingController, public navCtrl: NavController, public request: httprequest, public storage: Storage) {
    
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
        })
      }
      else {
        this.GetActiveEvent();
      }
    });

    this.storage.get('inactiveEvents').then((EventsList) => {
      this.inactiveEvents = [];
      this.PastEventExists = true;
      if (EventsList.length != 0) {
        for (let event of EventsList) {
          if (event != null) {
            this.inactiveEvents.unshift(event);
          }
        }
      }
    }).catch(() => {
      this.GetInactiveEvents();
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
          this.FormatTime(StartDateISO),
          this.FormatTime(EndDateISO),
          new LatLng(event.StartLat, event.StartLon),
          new LatLng(event.EndLat, event.EndLon),
          true);

        this.CurrentEvent = newEvent;
        this.EventName = this.CurrentEvent.EventName;
        this.EventDescription = this.CurrentEvent.EventDesc;
        this.EventParticipants = this.CurrentEvent.EventParticipants;
        this.EventEndDate = this.CurrentEvent.EventEndDate;
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
      this.storage.set('inactiveEvents', this.inactiveEvents).then(() => { this.PastEventExists = false; location.reload(); });
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

  favoriteEvent() {
    this.request.FavoriteEvent(this.CurrentEvent.EventID);
  }
}


