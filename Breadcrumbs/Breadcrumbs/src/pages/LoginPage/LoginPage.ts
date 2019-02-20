import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { BCWorker } from '../../worker';
import { LatLng } from '@ionic-native/google-maps';
import { Event } from '../../datastructs';

function GetEvents(worker, request, storage) {
  return new Promise(function (resolve, reject) {
    worker.PullActiveEvent(request, storage);
    worker.PullInactiveEvents(request, storage);
    resolve();
  });
}

@Component({
  selector: 'page-LoginPage',
  templateUrl: 'LoginPage.html',
  providers: [httprequest]
})
export class LoginPagePage {
  @ViewChild("firstName") firstName;
  @ViewChild("lastName") lastName;
  @ViewChild("email") email;
  @ViewChild("mobile") phonenumber;
  @ViewChild("username") username;
  @ViewChild("password") password;
  isRegister: boolean = false;
  userID: any;
  validUser: any;
  //userValidation: User; 
  data: string;
  shouldHeight: any = document.body.clientHeight + 'px';

  constructor(public navCtrl: NavController, public request: httprequest, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPagePage');
  }

  signIn() {
    if (this.username.value == "") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
      });
      alert.present();
    } else
      if (this.password.value == "") {
        let alert = this.alertCtrl.create({
          title: "Attention", subTitle: "Password field is empty", buttons: ["Ok"]
        });
        alert.present();
      }
  }

  Register() {
    //check fields to see if they are valid
    if (this.firstName.value == "") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "First Name field is empty", buttons: ["Ok"]
      });
      alert.present();
    } else
      if (this.lastName.value == "") {
        let alert = this.alertCtrl.create({
          title: "Attention", subTitle: "Last Name field is empty", buttons: ["Ok"]
        });
        alert.present();
      } else
        if (this.email.value == "") {
          let alert = this.alertCtrl.create({
            title: "Attention", subTitle: "Email field is empty", buttons: ["Ok"]
          });
          alert.present();
        } else
          if (this.phonenumber.value == "") {
            let alert = this.alertCtrl.create({
              title: "Attention", subTitle: "Phone number field is empty", buttons: ["Ok"]
            });
            alert.present();
          } else
            if (this.username.value == "") {
              let alert = this.alertCtrl.create({
                title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
              });
              alert.present();
            } else
              if (this.password.value == "") {
                let alert = this.alertCtrl.create({
                  title: "Attention", subTitle: "Password field is empty", buttons: ["Ok"]
                });
                alert.present();
              } else
              //submit data if all feilds are valid
              {
                let data2 = {
                  username: this.username.value,
                  password: this.password.value,
                  email: this.email.value,
                  firstname: this.firstName.value,
                  lastname: this.lastName.value,
                  userID: -1
                }
                let loading = this.loadingCtrl.create({
                  content: 'Registering..'
                });
                loading.present().then(() => {
                  this.request.CreateUser(data2).then(() => {
                    location.reload();
                  });
                });
              }
  }


  GetUser(loading) {
    this.request.GetUser(this.username.value).then((user) => {
      this.storage.set('user', user['recordset'][0]).then(() => {
        this.storage.set('userID', user['recordset'][0].UserID).then(() => {
          this.navCtrl.setRoot(HomePage);
        })
      });
    }).then(() => { loading.dismiss() });
  }

  signUp() {
    this.isRegister = true;
  }

  cancelRegister() {
    this.isRegister = false;
  }

  initialClick() {
    this.signIn();
    this.validateUser();
    console.log(this.validUser, "its true");
  }

  validateUser() {
    let user = {
      username: this.username.value,
      password: this.password.value
    }
    let loading = this.loadingCtrl.create({
      content: 'Retrieving account information...'
    });
    loading.present().then(() => {
      this.request.SignIn(user).then((isValid) => {
 
        if (isValid) this.GetUser(loading);
      });
    });
  }
}



