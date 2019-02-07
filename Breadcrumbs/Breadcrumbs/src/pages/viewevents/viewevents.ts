import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
       Create on: {{e.EventCreationDate}}
    </ion-card-content>
  </ion-card>
</ion-content>
`
})

export class vieweventsPage {
  inactiveEvents: any;
  inactiveEventsContacts: any;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //Put the user's inactive events into local storage

    this.storage.get('inactiveEvents').then((events) => {
      if (events != null) {
        this.inactiveEvents = events;
        //function to convert SQL Server smalldatetime to a more human readable string
      }
      else {
          this.getInactiveEvents();
      }
      function formatTime(datetime: string): string {
        let year: string = (new Date(datetime).getFullYear()).toString();
        let month: string = monthNames[(new Date(datetime).getMonth())];
        let weekday: string = dayNames[(new Date(datetime).getDay())];
        let date: string = (new Date(datetime).getDate()).toString();

        let result: string = weekday + ', ' + month + ' ' + date + ', ' + year;
        return result;
      }
    });
}


getInactiveEvents() {
  this.request.RequestInactiveEvents().then((data) => {
    this.storage.set('inactiveEvents', data['recordset']);
    this.storage.set('newEventSubmit', false);
  });
}

  //When ViewEvent gets called, push viewEventPage onto stack.
  ViewEvent(e: any) {
    this.storage.set('viewedEvent', e).then(() => {
      this.navCtrl.push(viewEventPage);
    });
  }
}
