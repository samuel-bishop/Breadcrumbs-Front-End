import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { viewEventPage } from '../viewEvent/viewEvent';

@Component({
    selector: 'page-viewevents',
    templateUrl: 'viewevents.html',
    providers: [httprequest]
})

export class vieweventsPage {
  activeEvent: any;
  inactiveEvents: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage) {
    //Put the user's active event into local session storage
    this.storage.get('activeEvent').then((data) => {
      document.getElementById("activeEventButton").textContent = data.EventName;
    });
    //Put the user's inactive events into local session storage
    this.storage.get('inactiveEvents').then((data) => {
      this.inactiveEvents = data;
    });
  }

  ViewEvent(e: any) {
    this.navCtrl.push(viewEventPage, {element: e});
  }
}
