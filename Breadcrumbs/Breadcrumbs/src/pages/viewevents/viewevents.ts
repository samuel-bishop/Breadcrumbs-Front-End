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
      console.log(data);
      document.getElementById("activeEventButton").innerText = data.EventName;
    });
  }

  ionViewDidLoad() {
  }
}
