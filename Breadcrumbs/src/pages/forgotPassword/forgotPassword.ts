import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the forgotPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-forgotPassword',
    templateUrl: 'forgotPassword.html'
})


export class forgotPasswordPage {
    //items for the input
  @ViewChild("email") email;

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad forgotPasswordPage');
    }

  submit() {

  }
}
