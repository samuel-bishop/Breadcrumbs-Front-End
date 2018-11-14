import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { httprequest } from '../../httprequest';

@Component({
  selector: 'page-viewEvent',
  templateUrl: 'viewEvent.html',
  providers: [httprequest]
})

export class viewEventPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage) {
    //set the viewedEvent in session storage.
    this.storage.set('viewedEvent', navParams.data.element);
  }

  ionViewWillEnter() {
    //get the stored viewedEvent
    console.log("ionViewWillEnter");
    this.storage.get('viewedEvent').then((data) => {
      //set the text for the HTMLElements
      console.log(data.StartDate);

      document.getElementById("viewEventTitle").textContent = data.EventName;
      document.getElementById("EventStartDateLabel").textContent = data.EventStartDate;
      document.getElementById("EventEndDateLabel").textContent = data.EndDate;
      document.getElementById("EventPosLatLabel").textContent = data.PositionLatitude;
      document.getElementById("EventPosLonLabel").textContent = data.PositionLongitude;
      //var mapsLink: string = 'https://www.google.com/maps/' + data.PositionLatitude + ',' + data.PositionLongitude;
      //(document.getElementById("burl") as HTMLAnchorElement).href = mapsLink;
    });
  }

  ionViewWillLeave() {
    //this.storage.remove('viewedEvent');
  }
}
