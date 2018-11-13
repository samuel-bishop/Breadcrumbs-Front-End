import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { addeventPage } from '../addevent/addevent';
import { vieweventsPage } from '../viewevents/viewevents';
import { httprequest } from '../../httprequest';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [httprequest]
})

export class HomePage {

  currentEvent: any;
  constructor(public navCtrl: NavController, public request: httprequest) {
    this.getActiveEvent();
  }
  
  getActiveEvent() {
    this.request.GetActive(1)
      .then(data => {
        console.log(data['recordset'][0])
        this.currentEvent = data['recordset'][0];

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
}
