import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { addcontactPage } from '../addcontact/addcontact';

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
