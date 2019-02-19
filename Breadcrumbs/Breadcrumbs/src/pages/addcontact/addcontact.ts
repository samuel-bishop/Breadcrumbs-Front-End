import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';

/*
  Generated class for the addcontact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addcontact',
  templateUrl: 'addcontact.html',
  providers: [httprequest]
})
export class addcontactPage {
  userid: any;
  private contact: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage)
  {
    this.contact = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['']
    });
  }

  contactForm() {
    this.storage.get('userID').then((data) => { this.userid = data 
    let contactData = {
      "userid": this.userid,
      "firstName": this.contact.value.firstName,
      "lastName": this.contact.value.lastName,
      "phoneNumber": this.contact.value.phoneNumber,
      "emailAddress": this.contact.value.emailAddress
    }
      this.request.InsertContact(this.storage.get('userID'), contactData);
      this.navCtrl.pop({ animate: false});
    });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad addcontactPage');
  }

  cancelClick() {
    this.navCtrl.pop({animate: false});
  }

}
