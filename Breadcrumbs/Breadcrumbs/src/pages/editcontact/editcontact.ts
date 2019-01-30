import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';

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
  userid: any;
  private editcontact: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage) {
    this.editcontact = this.formBuilder.group({
      contactID: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['']
    });
  }

  editcontactForm() {
    this.storage.get('userID').then((data) => {
    this.userid = data
      let editcontactData = {
        "userid": this.userid,
        "firstName": this.editcontact.value.firstName,
        "lastName": this.editcontact.value.lastName,
        "phoneNumber": this.editcontact.value.phoneNumber,
        "emailAddress": this.editcontact.value.emailAddress
      }
      this.request.InsertContact(this.storage.get('userID'), editcontactData);
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad editcontactPage');
  }

  cancelClick() {
    this.navCtrl.pop();
  }

  findcontactIDClick() {
    contactID: 'Test';
  }
}
