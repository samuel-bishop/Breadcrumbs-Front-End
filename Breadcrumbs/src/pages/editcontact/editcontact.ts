import { Component } from '@angular/core';
import { NavController, NavParams, DateTime, LoadingController, Platform, AlertController, Alert } from 'ionic-angular';
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
  shouldHeight: any = document.body.clientHeight + 'px';
  isMobile: boolean;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage, public platform: Platform){
    this.contactID = navParams.get('contactID');
    this.contactFirstName = navParams.get('contactFN');
    this.contactLastName = navParams.get('contactLN');
    this.contactPhoneNumber = navParams.get('contactPN');
    this.contactEmailAddress = navParams.get('contactEM');

    if (platform.is('mobile')) {
      this.isMobile = true;
    }
    else this.isMobile = false;
    this.editcontact = this.formBuilder.group({
      contactID: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['']
    });
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
}
