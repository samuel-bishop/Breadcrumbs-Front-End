import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'page-viewevents',
    templateUrl: 'viewevents.html'
})

export class vieweventsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad vieweventsPage');
    document.getElementById("activeEvent").innerHTML = "It worked!";
    document.getElementById("event1").innerHTML = "It worked2!";
    document.getElementById("event2").innerHTML = "It worked3!";
    document.getElementById("event3").innerHTML = "It worked4!";
    document.getElementById("event4").innerHTML = "It worked5!";
    document.getElementById("event5").innerHTML = "It worked6!";
  } 
}
