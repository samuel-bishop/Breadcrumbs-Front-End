import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { httprequest } from '../../httprequest';
import { addcontactPage } from '../addcontact/addcontact';
import { editcontactPage } from '../editcontact/editcontact';

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
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest)
  {
   // this.GetContacts();
  }

    ionViewWillLoad() {
      this.GetContacts();
    }

  deleteContact(contactID) {
    var alert = this.alertCtrl.create({
      title: 'Confirm Delete', subTitle: 'Are you sure you want to permanently delete this emergency contact?',
      buttons:
        [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.request.DeleteContact(contactID);
            this.contacts = this.arrayRemove(this.contacts, contactID);
            //this.navCtrl.pop({ animate: false });
            //var alert = this.alertCtrl.create({ title: 'Success!', subTitle: 'Contact has been deleted.', buttons: ['Radical!'] });
            //alert.present();
          }
        }]
    });
    alert.present();
  }

  GetContacts() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Contacts...'
    });

    loading.present();
    this.request.RequestContacts().then((data) => {
      this.contacts = data['recordset'];
    }).then(() => {
    loading.dismiss();
    }).catch ((data) => {
    this.navCtrl.pop({ animate: false });
    this.navCtrl.push(addcontactPage, { animate: false });
    loading.dismiss();
  });
  }

  addContact() {
    this.navCtrl.push(addcontactPage, { animate: false });
  }

  editContact(contactID, cFN, cLN, cPN, cEM) {
    this.navCtrl.push(editcontactPage, {
      contactID: contactID,
      contactFN: cFN,
      contactLN: cLN,
      contactPN: cPN,
      contactEM: cEM,
      animate: false
    });

  }

  arrayRemove(arr, contactID) {
    return arr.filter(function (contact) {
      return contact.EmergencyContactID != contactID;
    });
  }
}
