import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { addeventPage } from '../addevent/addevent';
import { addcontactPage } from '../addcontact/addcontact';
import { vieweventsPage } from '../viewevents/viewevents';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [httprequest]
})

export class HomePage {

  constructor(public navCtrl: NavController, public request: httprequest, public storage: Storage) {
    this.getActiveEvent();
    this.storage.get('activeEvent').then((data) => {
     // console.log(data);
      document.getElementById("activeEventContent").innerText = data.EventName;
    });

    this.getInactiveEvent();
  } 
  
  getActiveEvent() {
    this.request.RequestActiveEvent(1)
      .then(data => {
        this.storage.set('activeEvent', data['recordset'][0]);
      })
  }

  getInactiveEvent() {
    this.request.RequestInactiveEvents(1)
      .then(data => {
        console.log(data);
        this.storage.set('inactiveEvents', data['recordset']);
      })
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
}
