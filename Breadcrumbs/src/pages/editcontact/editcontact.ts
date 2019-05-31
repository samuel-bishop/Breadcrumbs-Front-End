import { Component } from '@angular/core';
import { NavController, NavParams, DateTime, LoadingController, Platform, AlertController, Alert } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { addcontactPage } from '../addcontact/addcontact';
import { HomePage } from '../home/home';
import { contactlistPage } from '../contactlist/contactlist';

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
      firstName: ['', Validators.pattern('^[A-Za-z. ]+$')],
      lastName: ['', Validators.pattern('^[A-Za-z. ]+$')],
      phoneNumber: ['', Validators.pattern('^[A-Za-z. ]*^\\D?(\\d{3})\\D?\D?(\\d{3})\\D?(\\d{4})$')],
      emailAddress: ['', Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')],
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
            if (editcontactData.firstName.length > 35 || editcontactData.lastName.length > 35) {
              let alert = this.alertCtrl.create({
                title: "Attention:", subTitle: 'Names must be less than 35 characters.', buttons: ["Ok"]
              });
              alert.present();
            }
            else {
              this.request.UpdateContact(editcontactData);
              this.navCtrl.pop({ animate: false });
              this.navCtrl.pop({ animate: false });
              this.navCtrl.push(contactlistPage);
            }
          }
        }]
    });
    alert.present();

  }
}
