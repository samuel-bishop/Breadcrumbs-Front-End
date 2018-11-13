import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { userid } from '../home';

@Component({
    selector: 'page-viewevents',
    templateUrl: 'viewevents.html',
    providers: [httprequest]
})


export class vieweventsPage {
  activeEvent: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage) {
    this.storage.get('activeEvent').then((data) => {
      //console.log(data);
      document.getElementById("activeEventButton").innerText = data.EventName;
    });
    this.storage.get('inactiveEvents').then((data) => {
      //console.log('Inactive Event 0 Name: ' + data[0].EventName);
      document.getElementById("event1").innerText = data[0].EventName;
      document.getElementById("event2").innerText = data[1].EventName;
      document.getElementById("event3").innerText = data[2].EventName;
      document.getElementById("event4").innerText = data[3].EventName;
      document.getElementById("event5").innerText = data[4].EventName;
    });
  }

  ionViewDidLoad() {
  }
}
