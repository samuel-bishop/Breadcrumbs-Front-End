import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { httprequest } from '../../httprequest';
import { addcontactPage } from '../addcontact/addcontact';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest)
  {
    this.GetContacts();
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad contactlistPage');
    }

  GetContacts() {
    this.request.RequestContacts().then((data) => {
      this.contacts = data['recordset'];
    });
  }

  addContact() {
    this.navCtrl.push(addcontactPage, { animate: false });
  }
}
