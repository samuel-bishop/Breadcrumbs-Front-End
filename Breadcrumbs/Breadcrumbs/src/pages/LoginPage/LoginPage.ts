import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../Register/Register';
import { httprequest } from '../../httprequest';


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-LoginPage',
  templateUrl: 'LoginPage.html',
    providers: [httprequest]
})
export class LoginPagePage {
  @ViewChild("username") username;
  @ViewChild("password") password;
  data: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPagePage');
    }

  signIn() {
    //this.navCtrl.push(HomePage);
    if (this.username.value=="") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
      });
      alert.present();
    } else
    if (this.password.value=="") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Password field is empty", buttons: ["Ok"]
      });
      alert.present();
    }

  }
  signUp() {
    this.navCtrl.push(RegisterPage);
  }

}
