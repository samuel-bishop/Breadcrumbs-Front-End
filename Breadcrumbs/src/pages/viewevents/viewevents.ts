import { NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Component } from '@angular/core';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { viewEventPage } from '../viewEvent/viewEvent';
import { Event } from '../../datastructs';
import { LatLng } from '@ionic-native/google-maps';

@Component({
    selector: 'page-viewevents',
    templateUrl: 'viewevents.html',
    providers: [httprequest]
})

export class vieweventsPage {
  inactiveEvents: any;
  inactiveEventsContacts: any;
    favoriteEvents: any;
  favoriteEventsExist: boolean;
  isMobile: boolean;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public request: httprequest, public storage: Storage, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    if (this.platform.is('mobile')) {
      this.isMobile = true;      
    }
    else this.isMobile = false;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //Put the user's inactive events into local storage

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

    this.storage.get('inactiveEvents').then((events) => {
      this.inactiveEvents = null;
      if (events != null) {
        this.inactiveEvents = events;
        //function to convert SQL Server smalldatetime to a more human readable string
      }
      else {
        this.GetInactiveEvents();
        this.storage.get('inactiveEvents').then((events) => {
          this.inactiveEvents.events;
        })
      }

    });
}


  toggleBool(bool) {
    return (bool ? false : true);
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele.EventID != value.EventID;
    });
  }

  Delete(event) {
    let alert = this.alertCtrl.create({
      title: "Attention", message: "Are you sure you want to delete this event, this cannot be undone", buttons: [{ text: 'Cancel' }, { text: 'Ok', handler: data => this.DeleteEvent(event) }],
    });
    alert.present();
    console.log(alert);
  }

  DeleteEvent(event) {
    this.request.DeleteEvent(event.EventID);
    if (event.IsFavorite) {
      this.request.FavoriteEvent(event.EventID);
    }
       
    this.inactiveEvents = this.arrayRemove(this.inactiveEvents, event);
    this.favoriteEvents = this.arrayRemove(this.favoriteEvents, event);
    this.storage.set('favoriteEvents', this.favoriteEvents);
    this.storage.set('inactiveEvents', this.inactiveEvents);
  }

  favoriteEvent(event) {
    this.request.FavoriteEvent(event.EventID);
    event.IsFavorite = this.toggleBool(event.IsFavorite);
    let index = this.inactiveEvents.indexOf(event);
    this.inactiveEvents = this.arrayRemove(this.inactiveEvents, event);
    this.inactiveEvents.splice(index, 0, event);
    //this.inactiveEvents.unshift(event);
    event.IsFavorite ? this.favoriteEvents.unshift(event) : this.favoriteEvents = this.arrayRemove(this.favoriteEvents, event);
    if (this.favoriteEvents.length == 0) this.favoriteEventsExist = false;
    else this.favoriteEventsExist = true;
    this.storage.set('inactiveEvents', this.inactiveEvents);
    this.storage.set('favoriteEvents', this.favoriteEvents);
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

  GetInactiveEvents() {
    this.request.RequestInactiveEvents().then((data) => {
      this.inactiveEvents = [];
      let dataset = data['recordset'];
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
        newEvent.IsFavorite = event.IsFavorite;
        this.inactiveEvents.unshift(newEvent);
      }
      this.storage.set('inactiveEvents', this.inactiveEvents).then(() => {
      });
    });
    if (this.inactiveEvents == null) {
      //let alert = this.alertCtrl.create({
      //  title: "Error", subTitle: `Something went wrong, please refresh the page or try again later..`, buttons: ["Ok"]
      //});
      //alert.present();
    }
  }

  //When ViewEvent gets called, push viewEventPage onto stack.
  viewEvent(e: any) {
    this.storage.set('viewedEvent', e).then(() => {
      this.navCtrl.push(viewEventPage, {}, { animate: false });
    });
  }
}
