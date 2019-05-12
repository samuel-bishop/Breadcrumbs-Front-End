import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';

/*
  Generated class for the favoriteEvents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-favoriteEvents',
    templateUrl: 'favoriteEvents.html'
})
export class favoriteEventsPage {
    favoriteEvents: any[];
    favoriteEventsExist: boolean;
    inactiveEvents: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage, public alertCtrl: AlertController) {
  }

  ionViewWillLoad() {
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
        this.getInactiveEvents();
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

  favoriteEvent(event) {
    this.storage.get('activeEvent').then((currentEvent) => {
      if (event.EventID == currentEvent.EventID) {
        currentEvent.IsFavorite = this.toggleBool(currentEvent.IsFavorite);
        this.request.FavoriteEvent(event.EventID);
        this.storage.set('activeEvent', currentEvent);
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

  getInactiveEvents() {
    this.request.RequestInactiveEvents().then((data) => {
      this.storage.set('inactiveEvents', data['recordset']);
      this.storage.set('newEventSubmit', false);
    });
  }
}
