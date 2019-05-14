import { Component } from '@angular/core';
import { NavController, NavParams, Platform, App } from 'ionic-angular';
import { LoginPagePage } from '../LoginPage/LoginPage';
/*
  Generated class for the infoPrompt page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-infoPrompt',
    templateUrl: 'infoPrompt.html'
})
export class infoPromptPage {
  shouldHeight: any = document.body.clientHeight + 'px';
  isMobile: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private app: App) {
    if (platform.is('mobile')) {
      this.isMobile = true;
    }
    else this.isMobile = false;
  }
    

    ionViewDidLoad() {
      console.log('ionViewDidLoad infoPromptPage');
    }

  login()
  {
    this.navCtrl.push(LoginPagePage);
  }

}
