import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { LoginPagePage } from '../pages/LoginPage/LoginPage';
import { Storage } from '@ionic/storage';
import { httprequest } from '../httprequest';
import { BCWorker } from '../worker';


function GetEvents(worker, request, storage) {
  worker.PullInactiveEvents(request, storage);
  return new Promise(function (resolve, reject) {
    worker.PullActiveEvent(request, storage);
    resolve();
  });
}

@Component({
  templateUrl: 'app.html',
  providers: [httprequest]
})

export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public request: httprequest, public storage: Storage) {
    this.storage.get('userID').then((id) => {
      if (id == 0 || id == null || id == undefined) this.rootPage = LoginPagePage;
      else this.rootPage = HomePage;
    }).catch(() => { this.rootPage = LoginPagePage; });
    platform.ready().then((source) => {
      if (platform.is('android')) {
        this.storage.set('device', 'android');
      }
      else if (platform.is('mobileweb')) {
        this.storage.set('device', 'mobileweb');
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
