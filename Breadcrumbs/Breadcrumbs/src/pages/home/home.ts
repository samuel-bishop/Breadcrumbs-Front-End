import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { addeventPage } from '../addevent/addevent';
import { addcontactPage } from '../addcontact/addcontact';
import { vieweventsPage } from '../viewevents/viewevents';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { Response, Request } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [httprequest]
})

export class HomePage {

  userid: any;
  newEventSubmit: boolean;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public request: httprequest, public storage: Storage) {
    //this.storage.clear();
    this.storage.set('newEventSubmit', true);
    this.storage.set('userID', 1);
    this.storage.get('userID').then((data) => { this.userid = data; });
  }

  presentLoadingEvent() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Event...'
    });

    loading.present();
   
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  getActiveEvent() {
    this.request.RequestActiveEvent(this.userid)
      .then(data => {
        console.log("getActiveEvent()");
        console.log(data);
        this.storage.set('activeEvent', data['recordset'][0]);
      })
  }

  ionViewWillEnter() {
    var newEvent;
    this.storage.get('newEventSubmit').then((data) => {
      newEvent = data;
      console.log("newEventBool: " + newEvent);
      if (newEvent === true || document.getElementById("activeEventContent").innerText === "") {
        this.getActiveEvent();
        this.getActiveEvent();
        this.getActiveEvent();
        this.storage.set('newEventSubmit', false);
        this.storage.get('activeEvent').then((data) => {
          console.log("activeEvent");
          console.log(data);
          console.log("EventName: " + data.EventName);
          document.getElementById("activeEventContent").innerText = data.EventName;
        });
      }
    });
  }

  onLink(url: string) {
      window.open(url);
  }

  addEvent() {
    this.navCtrl.push(addeventPage);
  }

  viewEvents() {
    this.navCtrl.push(vieweventsPage);
  }

  addContact() {
    this.navCtrl.push(addcontactPage);
  }
  
  checkIn() {
    this.storage.get('activeEvent').then((data) => {
      this.request.DisableEvent(data.EventID);
    });
    console.log("disableEvent");
  }
  
}
