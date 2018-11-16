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
  //activeEvent: any;
  inactiveEvents: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage) {
  }

  ionViewWillEnter() {
    this.getInactiveEvents();
    //Put the user's inactive events into local storage
    this.storage.get('inactiveEvents').then((data) => {
      this.inactiveEvents = data;
    });
  }

  getInactiveEvents() {
    this.request.RequestInactiveEvents(1)
      .then(data => {
        this.storage.set('inactiveEvents', data['recordset']);
      });
  }

  //When ViewEvent gets called, push viewEventPage onto stack.
  ViewEvent(e: any) {
    this.storage.set('viewedEvent', e);
    this.navCtrl.push(viewEventPage);
  }
}
