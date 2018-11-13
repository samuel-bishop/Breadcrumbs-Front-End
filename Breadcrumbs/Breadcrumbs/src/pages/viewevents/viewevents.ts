import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { httprequest } from '../../httprequest';
import { userid } from '../home';

@Component({
    selector: 'page-viewevents',
    templateUrl: 'viewevents.html',
    providers: [httprequest]

})

export class vieweventsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest) {
    //this.loadActiveEvent(1);
    //console.log(this.activeRecord);
  }
  //activeRecord: any;
  //loadActiveEvent(userid) {
  //  this.request.RequestActiveEvent(userid)
  //    .then(data => {
  //      this.activeRecord = data['recordset'];
  //    })
  //}

  //inactiveRecords: any;
  //loadInactiveEvents(userid) {
  //  this.request.RequestInactiveEvents(userid)
  //    .then(data => {
  //      this.inactiveRecords = data['recordset'];
  //    })
  //}

  ionViewDidLoad() {
    //this.loadActiveEvent(userid);
    //this.loadInactiveEvents(userid);
    //console.log('ionViewDidLoad vieweventsPage');
    //document.getElementById("activeEvent").innerHTML = this.activeRecord.EventName;
    //document.getElementById("inactiveEvent1").innerHTML = this.inactiveRecords[0].EventName;
    //document.getElementById("inactiveEvent2").innerHTML = this.inactiveRecords[1].EventName;
    //document.getElementById("inactiveEvent3").innerHTML = this.inactiveRecords[2].EventName;
    //document.getElementById("inactiveEvent4").innerHTML = this.inactiveRecords[3].EventName;
    //document.getElementById("inactiveEvent5").innerHTML = this.inactiveRecords[4].EventName;
  }
}
