import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController} from 'ionic-angular';
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

  //Constructor (called on page creation)
  constructor(public alertCtrl: AlertController, private menu: MenuController, public loadingCtrl: LoadingController, public navCtrl: NavController, public request: httprequest, public storage: Storage) {   
    let worker = new BCWorker();
    //this.storage.get('LastState').then((state) => {
      //if (state == 'EventSubmit') {
    //this.storage.get('CurrentEventExists').then((exists) => {
    //  this.CurrentEventExists = exists;
    //});
    this.request.RequestActiveEvent().then((data) => {
      this.CurrentEventExists = true;
      let event = data['recordset'][0];
          let newEvent = new Event(event.EventID,
            event.EventName,
            event.EventDescription,
            event.EventParticipants,
            worker.FormatTime(event.EventCreationDate),
            worker.FormatTime(event.EndDate),
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
          });
        }).catch(() => {
          this.storage.set('CurrentEventExists', false);
          this.CurrentEventExists = false;
      });

       
        this.storage.get('inactiveEvents').then((EventsList) => {
          this.inactiveEvents = [];
          if (EventsList.length == 0) {
            this.GetInactiveEvents();
          }
          for (let event of EventsList) {
            if (event != null) {
              this.inactiveEvents.unshift(event);
            }
          }
        }).catch(() => {
          this.GetInactiveEvents();
          });
        this.storage.set('LastState', 'HomePage');
  }

  GetInactiveEvents() {
    this.request.RequestInactiveEvents().then((data) => {
      let dataset = data['recordset'];
      for (let event of dataset) {
        let newEvent = new Event
          (event.EventID,
          event.EventName,
          event.EventDescription,
          event.EventParticipants,
          this.FormatTime(event.EventCreationDate),
          this.FormatTime(event.EndDate),
          new LatLng(event.StartLat, event.Startlon),
          new LatLng(event.EndLat, event.EndLon),
          false);
        this.inactiveEvents.unshift(newEvent);
      }
      this.storage.set('inactiveEvents', this.inactiveEvents);
      location.reload();
    })
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


  ionViewWillLoad() {
    this.storage.get('username').then((username) => {
      this.username = username;
    });
  
  }

  checkIn() {
    this.storage.set('CurrentEventExists', false).then(() => {
      this.CurrentEventExists = false;
    });
    this.storage.set('EditEvent', false);
    this.request.DisableEvent(this.CurrentEvent.EventID);
    this.storage.get('inactiveEvents').then((EventsList) => {
      EventsList.push(this.CurrentEvent);
      this.PastEventName = this.CurrentEvent.EventName;
      this.PastEventDescription = this.CurrentEvent.EventDesc;
      this.PastEventParticipants = this.CurrentEvent.EventParticipants;
      this.storage.set('inactiveEvents', EventsList);
      this.storage.set('activeEvent', null);
    });
  }


  toggleExists() {
    if (this.CurrentEventExists) this.CurrentEventExists = false;
    else this.CurrentEventExists = true;
    this.storage.set('CurrentEventExists', this.CurrentEventExists);
    //location.reload();
  }

  addContact() {
    this.navCtrl.push(addcontactPage, {},{ animate: false });
  }

  editContacts() {
    this.navCtrl.push(editcontactPage, {},{ animate: false });
  }

  viewEvent(event) {
    this.storage.set('viewedEvent', event).then(() => {
    this.navCtrl.push(viewEventPage, {}, { animate: false });
    })
  }

  viewPastEvents() {
    this.navCtrl.push(vieweventsPage, {},{ animate: false });
  }

  addEvent() {
    this.storage.set('EditEvent', false).then(() => {
      this.navCtrl.push(addeventPage,{}, { animate: false });
    })
  }

  editEvent() {
    this.storage.set('EditEvent', true).then(() => {
    this.navCtrl.push(addeventPage, {}, { animate: false });
    })
  }

  logout() {
    this.storage.set('userID', 0);
    this.storage.remove('inactiveEvents');
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
}


