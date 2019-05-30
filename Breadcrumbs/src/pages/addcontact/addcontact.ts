import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-addcontact',
  templateUrl: 'addcontact.html',
  providers: [httprequest]
})

export class addcontactPage {
  userid: any;
  private contact: FormGroup;
  shouldHeight: any = document.body.clientHeight + 'px';
  isMobile: boolean;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage)
  {
    this.contact = this.formBuilder.group({
      firstName: ['', Validators.pattern('^[A-Za-z. ]+$')],
      lastName: ['', Validators.pattern('^[A-Za-z. ]+$')],
      phoneNumber: ['', Validators.pattern('^[A-Za-z. ]*^\\D?(\\d{3})\\D?\D?(\\d{3})\\D?(\\d{4})$')],
      email: ['', Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')],
    });
  }

  contactForm() {
    this.storage.get('userID').then((data) => {
      this.userid = data
      let contactData = {
        "userid": this.userid,
        "firstName": this.contact.value.firstName,
        "lastName": this.contact.value.lastName,
        "phoneNumber": this.contact.value.phoneNumber,
        "emailAddress": this.contact.value.emailAddress
      }
      if (contactData.firstName.length > 35 || contactData.lastName.length > 35) {
        let alert = this.alertCtrl.create({
          title: "Attention", subTitle: 'Names must be less than 35 characters.', buttons: ["Ok"]
        });
        alert.present();
      }
      else {
        this.storage.get('userID').then((userid) => {
          this.request.InsertContact(userid, contactData).then(() => {
            this.navCtrl.pop({ animate: false });
          });
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad addcontactPage');
  }

  cancelClick() {
    this.navCtrl.pop({ animate: false });
  }
}
