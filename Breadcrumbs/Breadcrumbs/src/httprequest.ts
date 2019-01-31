import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, NavController } from 'ionic-angular';

/*
  Generated class for the httprequest provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

var aws_url = 'http://ec2-3-89-98-89.compute-1.amazonaws.com:4604' // original
//var aws_url = 'http://ec2-34-228-70-109.compute-1.amazonaws.com:4604' // copy
//var aws_tts_url = 'http://ec2-18-205-150-196.compute-1.amazonaws.com:4604' //time-tracking server

@Injectable()
export class httprequest {

  data: Object;
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http, public navCtrl: NavController, public storage: Storage) {
    console.log('Hello httprequest Provider');
  }

  //Load Active Event 
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
          },
            //On Error
            (error) => {
              var alert = this.alertCtrl.create({ title: 'Error: Connection Issue', subTitle: 'Cannot establish connection to  Breadcrumbs server', buttons: ['ok'] });
              alert.present();
            });
      });
    })
  }

  RequestActiveEventEndLoc() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {

        this.http.get(aws_url + '/activeEventEndLoc/' + userid)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          },
            //On Error
            (error) => {
              var alert = this.alertCtrl.create({ title: 'Error: Connection Issue', subTitle: 'Cannot establish connection to  Breadcrumbs server', buttons: ['ok'] });
              alert.present();
            });
      });
    })
  }

  RequestInactiveEvents() {
    let data;
    if (data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        this.http.get(aws_url + '/inactiveEvents/' + userid)
          .subscribe(data => {
            data = data.json();
            resolve(data);
          }, (error) => {
            var alert = this.alertCtrl.create({ title: 'Error: Connection Issue', subTitle: 'Cannot establish connection to Breadcrumbs server', buttons: ['ok'] });
            alert.present();
          });
      });
    })
  }

  //Load contacts
  RequestContacts() {
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
              var alert = this.alertCtrl.create({ title: 'Error: Connection Issue', subTitle: 'Cannot establish connection to  Breadcrumbs server', buttons: ['ok'] });  //Display an error alert
              alert.present();
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


  /*StartWatchTest(eventID, endTime) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json')
    var body = {
      'eventID': eventID, 'endTime': endTime, 'c1FName': "TestFName1", 'c1LName': "TestLName1", 'c1Email': "testEmail1@gmail.com", 'c1Phone': "111-111-1111", 'c2FName': "TestFName2", 'c2LName': "TestLName1", 'c2Email': "testEmail2@gmail.com", 'c2Phone': "222-222-2222", 'c3FName': "TestFName3", 'c3LName': "TestLName1", 'c3Email': "testEmail3@gmail.com", 'c3Phone': "333-333-3333"}
    this.http.post(aws_tts_url + '/startwatch/', body)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }*/
}
