import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { httprequest } from '../../httprequest';

/*
  Generated class for the contactlist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-contactlist',
    templateUrl: 'contactlist.html'
})
export class contactlistPage {
  contacts: any;
  userid: any;
  contactFirstName: any;
  contactLastName: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad contactlistPage');
    }

  GetContacts() {
    this.request.RequestContacts().then((data) => {
      this.inactiveEvents = [];
      let dataset = data['recordset'];
      for (let event of dataset) {
        let newEvent = new Event
          (event.EventID,
          event.EventName,
          event.EventDescription,
          event.EventParticipants,
          event.EventStartDate,
          event.EndDate,
          new LatLng(event.StartLat, event.Startlon),
          new LatLng(event.EndLat, event.EndLon),
          false);
        newEvent.IsFavorite = event.IsFavorite;
        this.inactiveEvents.unshift(newEvent);
      }
      this.storage.set('inactiveEvents', this.inactiveEvents).then(() => {
      });
    });

}
