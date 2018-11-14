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

  userid: any;
  constructor(public navCtrl: NavController, public request: httprequest, public storage: Storage) {
    //this.storage.clear();
    this.getActiveEvent();
    storage.set('userID', 1);
    storage.get('userID').then((data) => {this.userid = data });
  } 
  
  getActiveEvent() {
    this.request.RequestActiveEvent(this.userid)
      .then(data => {
        this.storage.set('activeEvent', data['recordset'][0]);
      })
  }

  ionViewWillEnter() {
    this.storage.get('activeEvent').then((data) => {
      // console.log(data);
      document.getElementById("activeEventContent").innerText = data.EventName;
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

}
