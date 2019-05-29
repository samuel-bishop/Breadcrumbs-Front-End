import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { httprequest } from '../../httprequest';

@Component({
  selector: 'page-viewEvent',
  templateUrl: 'viewEvent.html',
  providers: [httprequest]
})

export class viewEventPage {

  EventName: any;
  EventStartDate: any;
  EventEndDate: any;
  EventEndLat: any;
  EventEndLng: any;
  EventDesc: any;
  EventParticipants: any;
  EventID: any;
  Contacts: any;
  event: any;
  inactiveEvents: any; //A list of inactive events

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('viewedEvent').then((event) => {
      this.EventID = event.EventID;
      this.request.RequestEventContacts(event.EventID).then((data) => {
        this.Contacts = data['recordset'];
      })
      this.EventName = event.EventName;
      this.EventStartDate = event.EventStartDate;
      this.EventEndDate = event.EventEndDate;
      this.EventEndLat = event.EventEndLatLng.lat;
      this.EventEndLng = event.EventEndLatLng.lng;
      this.EventDesc = event.EventDesc;
      this.EventParticipants = event.EventParticipants;
    });
    this.storage.set('vieweventid', this.EventID);
  }


}
