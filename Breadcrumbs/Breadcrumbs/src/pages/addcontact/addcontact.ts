import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the addcontact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-addcontact',
    templateUrl: 'addcontact.html'
})
export class addcontactPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad addcontactPage');
    }

  cancelClick() {
    this.navCtrl.pop();
  }

}
