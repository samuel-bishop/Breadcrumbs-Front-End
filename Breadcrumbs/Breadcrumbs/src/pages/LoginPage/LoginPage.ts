import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../Register/Register';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-LoginPage',
    templateUrl: 'LoginPage.html'
})
export class LoginPagePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPagePage');
    }

  signIn() {
    this.navCtrl.push(HomePage);
  }
  signUp() {
    this.navCtrl.push(RegisterPage);
  }

}
