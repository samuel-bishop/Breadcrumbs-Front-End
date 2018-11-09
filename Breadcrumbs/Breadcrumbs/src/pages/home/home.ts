import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { addeventPage } from '../addevent/addevent';
import { vieweventsPage } from '../viewevents/viewevents';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public navCtrl: NavController) {
    
  }
  
  onLink(url: string) {
      window.open(url);
  }

  addEvent() {
    this.navCtrl.push(addeventPage);
  }

  viewEvents() {
    this.navCtrl.push(vieweventsPage);
  }
}
