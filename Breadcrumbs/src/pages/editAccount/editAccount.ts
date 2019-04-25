import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';


/*
  Generated class for the editUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editAccount',
  templateUrl: 'editAccount.html',
  providers: [httprequest]
})
export class editAccountPage {
  userid: any;
  accFirstName: any;
  accLastName: any;
  accPhoneNumber: any;
  accEmail: any;
  private editAccount: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest,
    public formBuilder: FormBuilder, public storage: Storage, public loadingCtrl: LoadingController
    , public alertCtrl: AlertController) {
    storage.get('userID').then((data) => { this.userid = data; console.log(this.userid); });
    this.getAccountInfo();
    this.editAccount = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required]
    });
  }

  getAccountInfo() {
    //create the loading screen
    let loading = this.loadingCtrl.create({
      content: 'Loading Account Information...'
    });
    //display loading screen
    loading.present();

    //request account information
    this.request.AccountInfo().then((data) => {
      //set variables from returned information
      this.accFirstName = data['recordset'][0].FirstName;
      this.accLastName = data['recordset'][0].LastName;
      this.accEmail = data['recordset'][0].Email;
    }).then(() => {
      loading.dismiss(); //turn off loading page
    }).catch((data) => {
      //on error
      loading.dismiss();
    });
  }


  editAccountForm() {
    var alert = this.alertCtrl.create({
      title: 'Confirm Changes', subTitle: 'Are you sure you want to change this account information?',
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

            let editAccountData = {
              "userID": this.userid,
              "firstName": this.editAccount.value.firstName,
              "lastName": this.editAccount.value.lastName,
              "phoneNumber": this.editAccount.value.phoneNumber,
              "emailAddress": this.editAccount.value.emailAddress
            }

            this.storage.get('user').then((user) => {
              this.storage.set('user', {
                "UserName": user.UserName,
                "FirstName": editAccountData.firstName,
                "LastName": editAccountData.lastName,
                "Email": editAccountData.emailAddress
              });
            });
            
            this.request.UpdateAccount(editAccountData);
            this.navCtrl.pop({ animate: false });
            var alert = this.alertCtrl.create({ title: 'Success!', subTitle: 'Account has been updated.', buttons: ['Radical!'] });
            alert.present();
          }
        }]
    });
    alert.present();
  }

  cancelClick() {
    this.navCtrl.pop();
  }

}
