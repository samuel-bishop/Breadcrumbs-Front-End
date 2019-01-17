import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { eventEditPage } from '../eventEdit/eventEdit';
import { httprequest } from '../../httprequest';



@Component({
  selector: 'page-editevent',
  templateUrl: 'editevent.html',
  providers: [httprequest],
  template: `
<ion-header>
  <ion-navbar>
    <ion-title>Event History</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-card *ngFor="let e of currentEvent" (click)="EditEvent(e)">
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
export class editeventPage {

  //this is my current event
  currentEvent: any;

  constructor(public request: httprequest, public storage: Storage, public navCtrl:NavController, public navParams : NavParams ) {
  };

  //this does things when entering a page, but before it becomes the active one
  ionViewWillEnter() {

    //get active event and put it into local storage
    this.getActiveEvent();
  }

  //function for geting an active event
  getActiveEvent() {
    this.request.RequestActiveEvent().then((data) => {
      //create enums for names of months and days
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      //gets current events and sets the data
      this.storage.set('currentEvent', data['recordset']).then(() => {
        this.storage.get('currentEvent').then((data) => {
          this.currentEvent = data;

          //convert time
          for (let e of this.currentEvent) {
            e.EventCreationDate = formatTime(e.EventCreationDate);
          }
          //function to convert time to readable text
          function formatTime(datetime: string): string {
            let year: string = (new Date(datetime).getFullYear()).toString();
            let month: string = monthNames[(new Date(datetime).getMonth())];
            let weekday: string = dayNames[(new Date(datetime).getDay())];
            let date: string = (new Date(datetime).getDate()).toString();

            let result: string = weekday + ', ' + month + ' ' + date + ', ' + year;
            return result;
          }
        });
      });
    });
  }

  EditEvent(e: any) {
    this.storage.set('viewedEvent', e).then(() => {
      this.navCtrl.push(eventEditPage);
    });

  }
}
