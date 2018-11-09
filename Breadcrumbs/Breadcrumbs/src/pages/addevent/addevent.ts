import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { addcontactPage } from '../addcontact/addcontact';

/*
  Generated class for the addevent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-addevent',
    templateUrl: 'addevent.html'
})
export class addeventPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad addeventPage');
    }

  cancelClick() {
    this.navCtrl.pop();
  }

  addContactClick() {
    this.navCtrl.push(addcontactPage);
  }

}
