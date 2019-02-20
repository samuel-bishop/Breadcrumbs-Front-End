import { Component } from '@angular/core';
import { NavController, NavParams, DateTime, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { addcontactPage } from '../addcontact/addcontact';
import { HomePage } from '../home/home';

//TODO: Get select options to update on edit and delete.

/*
  Generated class for the editcontact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editcontact',
  templateUrl: 'editcontact.html',
  providers: [httprequest]
})
export class editcontactPage {
  contacts: any;
  userid: any;
  contactFirstName: any;
  contactLastName: any;
  contactPhoneNumber: any;
  contactEmailAddress: any;
  contactID: any;
  private editcontact: FormGroup;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage) {
    this.loadContacts();
    this.editcontact = this.formBuilder.group({
      contactID: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['']
    });
  }

  loadContacts() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Contacts...'
    });

    loading.present();
    this.request.RequestContacts().then((data) => {
      this.contacts = data['recordset'];
      this.contactID = data['recordset'][0].EmergencyContactID;
      this.contactFirstName = data['recordset'][0].ContactFirstName;
      this.contactLastName = data['recordset'][0].ContactLastName;
      this.contactPhoneNumber = data['recordset'][0].ContactPhoneNumber;
      this.contactEmailAddress = data['recordset'][0].ContactEmailAddress;
    }).then(() => {
      loading.dismiss();
      }).catch((data) => {
        this.navCtrl.pop({ animate: false });
        this.navCtrl.push(addcontactPage, { animate: false });
        loading.dismiss();
    });
  }

  onSelectChange(selectedValue: any) {
    this.contactID = selectedValue.EmergencyContactID;
    this.contactFirstName = selectedValue.ContactFirstName;
    this.contactLastName = selectedValue.ContactLastName;
    this.contactPhoneNumber = selectedValue.ContactPhoneNumber;
    this.contactEmailAddress = selectedValue.ContactEmailAddress;
  }

  editcontactForm() {
    var alert = this.alertCtrl.create({
      title: 'Confirm Changes', subTitle: 'Are you sure you want to change this emergency contact?',
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
              let editcontactData = {
                "contactid": this.contactID,
                "firstName": this.editcontact.value.firstName,
                "lastName": this.editcontact.value.lastName,
                "phoneNumber": this.editcontact.value.phoneNumber,
                "emailAddress": this.editcontact.value.emailAddress
              }
            this.request.UpdateContact(editcontactData);
            this.navCtrl.pop({ animate: false });
            var alert = this.alertCtrl.create({ title: 'Success!', subTitle: 'Contact has been updated.', buttons: ['Radical!'] });
            alert.present();
            }
        }]
    });
    alert.present();

  }

  cancelClick() {
    this.navCtrl.pop({animate: false});
  }

  deleteContact() {
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
            this.request.DeleteContact(this.contactID);
            this.navCtrl.pop({ animate: false });
            var alert = this.alertCtrl.create({ title: 'Success!', subTitle: 'Contact has been deleted.', buttons: ['Radical!'] });
            alert.present();
          }
        }]
    });
    alert.present();
  }

  addNewContact() {
    this.navCtrl.push(addcontactPage, { animate: false });
  }
}
