import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController, NavController } from 'ionic-angular';

/*
  Generated class for the httprequest provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

var aws_url = 'http://ec2-35-174-115-108.compute-1.amazonaws.com:4604' // original
//var aws_url = 'http://ec2-34-228-70-109.compute-1.amazonaws.com:4604' // copy

@Injectable()
export class httprequest {

  data: Object;
  constructor(public alertCtrl: AlertController, public http: Http, public navCtrl: NavController, public storage: Storage) {
    console.log('Hello httprequest Provider');
  }

  //Load contacts
  RequestContacts(loading) {
    //Check if the data has already be created
    if (this.data) {
      return Promise.resolve(this.data);
    }
    //Return a new promise
    return new Promise(resolve => { //Get the userid from storage
      this.storage.get('userID').then(userid => { //Create a GET call to the API servers contacts page
        this.http.get(aws_url + '/contacts/' + userid)
          .map(res => res.json()) //Map the response as a JSON object
          .subscribe(data => { //Handle the returned value from .map
            this.data = data;
            resolve(this.data);
          },
            //On error
            (error) => {
              var alert = this.alertCtrl.create({ title: 'Error', subTitle: error, buttons: ['ok'] });  //Display an error alert
              alert.present();
              loading.dismiss(); //Dismiss the loading screen
            });
      });
    })
  }

  RequestEvents() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        this.http.get(aws_url + '/events/' + userid)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    })
  }

  InsertEvent(eventData) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json')
    const requestOpts = new RequestOptions({ headers: header });
    this.http.post(aws_url + '/newevent', eventData, requestOpts)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }

  RequestActiveEvent() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        this.http.get(aws_url + '/activeEvent/' + userid)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    })
  }

  RequestInactiveEvents() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        this.http.get(aws_url + '/inactiveEvents/' + userid)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    })
  }

  InsertContact(userid, contactData) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    const requestOpts = new RequestOptions({ headers: header });
    this.http.post(aws_url + '/newContact', contactData, requestOpts)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }

  RequestEventContacts(eventID) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(aws_url + '/eventContacts/' + eventID)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }

  DisableEvent(eventID) {
    const requestOpts = new RequestOptions({ headers: header });
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json')
    var body = { 'eventID': eventID }
    this.http.post(aws_url + '/disableEvent/', body)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }
}
