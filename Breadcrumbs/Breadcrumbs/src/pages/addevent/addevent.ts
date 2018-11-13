import { Component } from '@angular/core';
import { NavController, NavParams, List } from 'ionic-angular';
import { addcontactPage } from '../addcontact/addcontact';
import { httprequest } from '../../httprequest';
import { getContacts } from '../../api/getAllContacts.js';
/*
  Generated class for the addevent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-addevent',
  templateUrl: 'addevent.html',
  providers: [httprequest]

})

export class addeventPage {

  contacts: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest)
  {
    this.loadContacts(1);
    console.log(this.contacts);
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad addeventPage');
    }

  loadContacts(userid) {
    this.request.RequestContacts(userid)
      .then(data => {
        this.contacts = data['recordset'];
      })
  }

  cancelClick() {
    this.navCtrl.pop();
  }

  addContactClick() {
    this.navCtrl.push(addcontactPage);
  }
}
