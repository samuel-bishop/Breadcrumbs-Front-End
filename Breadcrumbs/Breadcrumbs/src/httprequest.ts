import { Injectable, Component } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController } from 'ionic-angular';
import { UserService } from '../service/user.service';
import { appGlobals } from './app/file';
/*
  Generated class for the httprequest provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


//var aws_url = 'http://ec2-18-235-156-238.compute-1.amazonaws.com:4604'
var aws_url = 'http://18.235.156.238:4604'
var aws_tts_url = 'http://35.174.49.106:4605'

@Injectable()
export class httprequest {

  data: Object;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http, public storage: Storage) {
    console.log('Hello httprequest Provider');
  }

  //Load Active Event 
  RequestActiveEvent() {
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        this.http.get(aws_url + '/api/activeEvent/' + userid)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          },
            //On Error
            (error) => {

            });
      });
    })
  }

  RequestInactiveEvents() {
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        this.http.get(aws_url + '/api/inactiveEvents/' + userid)
          .subscribe(data => {
            data = data.json();
            resolve(data);
          }, (error) => {

          });
      });
    })
  }


  UpdateContact(contactData) {
    var alert = this.alertCtrl.create({ title: 'contactData', subTitle: contactData.firstName, buttons: ['OK'] });
    alert.present();

    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    const requestOpts = new RequestOptions({ headers: header });
    this.http.post(aws_url + '/api/updatecontact', contactData, requestOpts)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }

  DeleteContact(contactid) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    const requestOpts = new RequestOptions({ headers: header });
    let contact = { id: contactid }
    this.http.post(aws_url + '/api/deletecontact', contact, requestOpts)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
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
        this.http.get(aws_url + '/api/contacts/' + userid)
          .map(res => res.json()) //Map the response as a JSON object
          .subscribe(data => { //Handle the returned value from .map
            this.data = data;
            resolve(this.data);
          },
            //On error
            (error) => {

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
        this.http.get(aws_url + '/api/events/' + userid)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
    })
  }

  InsertEvent(eventData) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json')
      const requestOpts = new RequestOptions({ headers: header });
      this.http.post(aws_url + '/api/newevent/', eventData, requestOpts)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
      resolve('Success');
    });
  }

  InsertContact(userid, contactData) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    const requestOpts = new RequestOptions({ headers: header });
    this.http.post(aws_url + '/api/newContact/', contactData, requestOpts)
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
      this.http.get(aws_url + '/api/eventContacts/' + eventID)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }

  DisableEvent(eventID) {
    return new Promise(resolve => {
      const requestOpts = new RequestOptions({ headers: header });
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json')
      var body = { 'eventID': eventID }
      this.http.post(aws_url + '/api/disableEvent/', body)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
      resolve("Success");
    })
  }

  //Create User Account
  CreateUser(data) {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({ headers: headers });
      this.http.post(aws_url + '/api/createUser/', data)
        .subscribe(data => {
          console.log(data['_body']);
        });
      resolve("Success");
    });
  }

  GetUser(user: string) {
    return new Promise(resolve => {
      this.http.get(`${aws_url}/api/getUser/${user}`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, (error) => {

        });
    })
  }

  GetUserID(username) {
    return new Promise(resolve => {
      this.http.get(aws_url + '/api/getUserID/' + username)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        },
          (error) => {

          });
    });
  }

  SignIn(user) {
    return new Promise(resolve => {
      let isValid;
      this.http.get(aws_url + '/api/confirmUser/' + user.username + '/' + user.password)
        .map(res => res.json())
        .subscribe(data => {
          isValid = data;
          resolve(isValid);
          //console.log(data['_body'], "this is correct ");
        });
    });
  }


  InsertContactInfo(userid, contactData) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    const requestOpts = new RequestOptions({ headers: header });
    this.http.post(aws_url + '/createContactInfo/', contactData, requestOpts)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }

  StartWatchTest(eventID, endTime) {
    var body = {
      'eventID': eventID, 'endTime': endTime, 'c1FName': "TestFName1", 'c1LName': "TestLName1"
    }//, 'c1Email': "testEmail1@gmail.com", 'c1Phone': "111-111-1111", 'c2FName': "TestFName2", 'c2LName': "TestLName1", 'c2Email': "testEmail2@gmail.com", 'c2Phone': "222-222-2222", 'c3FName': "TestFName3", 'c3LName': "TestLName1", 'c3Email': "testEmail3@gmail.com", 'c3Phone': "333-333-3333"}
    this.http.post(aws_tts_url + '/startwatch/', body)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }

  CancelWatch(eventID) {
    var body = { 'eventID': eventID }
    this.http.post(aws_tts_url + '/cancelwatch/', body)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }


  ResetPassword(user) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    const requestOptions = new RequestOptions({ headers: headers });

    this.http.post(aws_url + '/resetPassword/', user)
      .subscribe(data => {
        console.log(data['body']);
      }, (error) => {
      });
  }
 }
