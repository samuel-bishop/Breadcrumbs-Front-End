import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { BCWorker } from '../../worker';

function GetEvents(worker, request, storage) {
  worker.PullInactiveEvents(request, storage);
  return new Promise(function (resolve, reject) {
    worker.PullActiveEvent(request, storage);
    resolve();
  });
}

@Component({
    selector: 'page-LoginPage',
  templateUrl: 'LoginPage.html',
  providers: [httprequest]
})
export class LoginPagePage {
  @ViewChild("username") username;
  @ViewChild("password") password;
  isRegister: boolean = false;
  userID: any;
  validUser: any;
  //userValidation: User; 
  data: string;
  constructor(public navCtrl: NavController,public request: httprequest, public navParams: NavParams, public alertCtrl: AlertController, public storage:Storage) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPagePage');
    }
  
  signIn() {
    //this.navCtrl.push(HomePage);
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
    this.storage.set('username', this.username.value);
    this.storage.set('userID', 1);
        //this.request.SignIn(user)
   }

  signUp() {
    //this.navCtrl.push(RegisterPage);
    this.isRegister = true;
  }

  cancelRegister() {
    this.isRegister = false;
  }

  initialClick() {
    //this.signIn();
    //this.validateUser();
    //console.log(this.validUser, "its true");
    this.storage.set('userID', 1);
    let worker = new BCWorker();
    GetEvents(worker, this.request, this.storage).then(() => { this.navCtrl.setRoot(HomePage); });
  }

  validateUser() {
    //let user = {
    //  username: this.username.value,
    //  password: this.password.value
    //}
    //if (request.SignIn(user))
    //  this.storage.set('userID', 1);
    //  this.navCtrl.pop();
    //  location.reload();
  };




}


