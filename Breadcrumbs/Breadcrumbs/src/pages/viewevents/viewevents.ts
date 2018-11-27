import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { viewEventPage } from '../viewEvent/viewEvent';

@Component({
    selector: 'page-viewevents',
    templateUrl: 'viewevents.html',
    providers: [httprequest],
  template: `
<ion-header>
  <ion-navbar>
    <ion-title>Event History</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-card *ngFor="let e of inactiveEvents" (click)="ViewEvent(e)">
    <ion-card-header>
      {{e.EventName}}
    </ion-card-header>
    <ion-card-content>
      Created on: {{e.EventCreationDate}}
    </ion-card-content>
  </ion-card>
</ion-content>
`
})

export class vieweventsPage {
  //activeEvent: any;
  inactiveEvents: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage) {
  }

  ionViewWillEnter() {
    this.getInactiveEvents();
    //Put the user's inactive events into local storage

  }

  getInactiveEvents() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Events...'
    });
    loading.present().then(() => {
      this.request.RequestInactiveEvents().then((data) => {
        this.storage.set('inactiveEvents', data['recordset']).then(() => {
          this.storage.get('inactiveEvents').then((data) => {
            this.inactiveEvents = data;
            loading.dismiss();
          });
        });
      }, () => {loading.dismiss(); });
    });
  }

  //When ViewEvent gets called, push viewEventPage onto stack.
  ViewEvent(e: any) {
    this.storage.set('viewedEvent', e);
    this.navCtrl.push(viewEventPage);
  }
}
