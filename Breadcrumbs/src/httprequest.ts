import { Injectable, Component } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, Platform } from 'ionic-angular';
import { UserService } from '../service/user.service';
import { appGlobals } from './app/file';
import { HomePage } from './pages/home/home';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the httprequest provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


//var aws_url = 'http://ec2-18-235-156-238.compute-1.amazonaws.com:4604'
//var aws_url = 'http://18.235.156.238:4604'
var aws_url = 'https://www.breadcrumbsapp.net'
//var aws_url = 'http://18.214.215.136:4604'
var aws_tts_url = 'http://35.174.49.106:4605'

@Injectable()
export class httprequest {

  data: Object;

  constructor(public alertCtrl: AlertController, private platform: Platform, public loadingCtrl: LoadingController, public http: Http, public storage: Storage) {
    console.log('Hello httprequest Provider');
  }

  GetAuth(username) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append('SessionID', 'getauth');
      header.append('username', username);
      const requestOpts = new RequestOptions({ headers: header });
      this.http.get(aws_url + '/getData/', requestOpts)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        },
          //On Error
        (error) => {
          var alert = this.alertCtrl.create({ title: 'Error!', subTitle: `${error}`, buttons: ['Radical!'] });
          alert.present();
          });
    })

  }

  //Load Active Event 
  RequestActiveEvent() {
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        //var body = { 'userID': userid };
        var header = new Headers();
        this.storage.get('auth').then((auth) => {
          header.append('AuthToken', auth);
          header.append('SessionID', 'getactiveevent');
          header.append('userID', userid);
          const requestOpts = new RequestOptions({ headers: header });
          this.http.get(aws_url + '/getData/', requestOpts)
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
    })
  }

  RequestInactiveEvents() {
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        var header = new Headers();
        //var body = { 'userID': userid };
        this.storage.get('auth').then((auth) => {
          header.append('AuthToken', auth);
          header.append('SessionID', 'getinactiveevents');
          header.append('userID', userid);
          const requestOpts = new RequestOptions({ headers: header });
          this.http.get(aws_url + '/getData/', requestOpts)
            .subscribe(data => {
              data = data.json();
              resolve(data);
            }, (error) => {
            });
        });
      })
    })
  }

  UpdateContact(contactData) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    this.storage.get('auth').then((auth) => {
      header.append('AuthToken', auth);
      header.append('SessionID', 'updatecontact');
      const requestOpts = new RequestOptions({ headers: header });
      this.http.post(aws_url + '/updateData/', contactData, requestOpts)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
    });
  }

  DeleteContact(contactid) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    this.storage.get('auth').then((auth) => {
      header.append('AuthToken', auth);
      header.append('SessionID', 'deletecontact');
      const requestOpts = new RequestOptions({ headers: header });
      let contact = { id: contactid }
      this.http.post(aws_url + '/updateData/', contact, requestOpts)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
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
        let body = { 'userid': userid };
        this.storage.get('auth').then((auth) => {
          var header = new Headers();
          header.append('AuthToken', auth);
          header.append('SessionID', 'getcontacts')
          header.append('userID', userid);
          var requestOpts = new RequestOptions({ headers: header });
          this.http.get(aws_url + '/getData/', requestOpts)
            .map(res => res.json()) //Map the response as a JSON object
            .subscribe(data => { //Handle the returned value from .map
              this.data = data;
              resolve(this.data);
            },//On error
              (error) => {

              });
        });
      })
    })
  }

  RequestEvents() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        //var body = { 'userID': userid };
        this.storage.get('auth').then((auth) => {
          var header = new Headers();
          header.append('AuthToken', auth);
          header.append('SessionID', 'getinactiveevents')
          header.append('userID', userid);
          var requestOpts = new RequestOptions({ headers: header });
          this.http.get(aws_url + '/getData/', requestOpts)
            .map(res => res.json())
            .subscribe(data => {
              this.data = data;
              resolve(this.data);
            });
        });
      });
    })
  }

  InsertEvent(eventData) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json');
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'newevent')
        const requestOpts = new RequestOptions({ headers: header });
        this.http.post(aws_url + '/updateData/', eventData, requestOpts)
          .subscribe(data => {
            console.log(data['_body']);
          }, error => {
            console.log(error);
          });
        resolve('Success');
      });
    });
  }

  InsertContact(userid, contactData) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    var body = {
      'userid': userid,
      'firstName': contactData.firstName,
      'lastName': contactData.lastName,
      'phoneNumber': contactData.phoneNumber,
      'emailAddress': contactData.emailAddress
    };
    this.storage.get('auth').then((auth) => {
      header.append('AuthToken', auth);
      header.append('SessionID', 'newcontact');
      const requestOpts = new RequestOptions({ headers: header });
      this.http.post(aws_url + '/updateData/', body, requestOpts)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
    });
  }

  RequestEventContacts(eventID) {
    return new Promise(resolve => {
      var header = new Headers();
      var body = { 'eventid': eventID };
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'geteventcontacts');
        header.append('eventid', eventID);
        const requestOpts = new RequestOptions({ headers: header });
        this.http.get(aws_url + '/getData/', requestOpts)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      })
    })
  }

  DisableEvent(eventID) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json')
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'disableevent');
        const requestOpts = new RequestOptions({ headers: header });
        var body = { 'eventID': eventID }
        this.http.post(aws_url + '/updateData/', body, requestOpts)
          .subscribe(data => {
            console.log(data['_body']);
          }, error => {
            console.log(error);
          });
        resolve("Success");
      })
    })
  }

  //Favorite Event
  FavoriteEvent(eventID) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json')
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'favoriteevent');
        const requestOpts = new RequestOptions({ headers: header });
        var body = { 'eventID': eventID }
        this.http.post(aws_url + '/updateData/', body, requestOpts)
          .subscribe(data => {
            console.log(data['_body']);
          }, error => {
            console.log(error);
          });
        resolve("Success");
      })
    })
  }

  //Create User Account
  CreateUser(data) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json');
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'createuser');
        const requestOpts = new RequestOptions({ headers: header });
        this.http.post(aws_url + '/updateData/', data, requestOpts)
          .subscribe(data => {
            resolve("success");
          }, (error) => {
            throw error;
          })
      });
    });
  }

  GetUser(user: string) {
    return new Promise(resolve => {
      var header = new Headers();
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'getuser');
        header.append('un-content', user);
        const requestOpts = new RequestOptions({ headers: header });
        this.http.get(aws_url + '/getData/', requestOpts)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          },
            (error) => {

            });
      })
    })
  }

  GetUserID(username) {
    return new Promise(resolve => {
      var body = { 'username': username };
      var header = new Headers();
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'getuserid');
        header.append('un-content', username);
        const requestOpts = new RequestOptions({ headers: header });
        this.http.get(aws_url + '/getData/', requestOpts)
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          },
            (error) => {

            });
      });
    })
  }

  SignIn(user) {
    return new Promise(resolve => {
      var header = new Headers();
      var body = { 'user': user.username, 'password': user.password };
      let isValid;
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'confirmuser');
        header.append('pw-content', user.password);
        header.append('un-content', user.username);
        const requestOpts = new RequestOptions({ headers: header });
        this.http.get(aws_url + '/getData/', requestOpts)
          .map(res => res.json())
          .subscribe(data => {
            isValid = data;
            resolve(isValid);
            //console.log(data['_body'], "this is correct ");
          });
      });
    })
  }


  InsertContactInfo(userid, contactData) {
    var header = new Headers();
    var body = {
      'userid': userid,
      'firstName': contactData.firstName,
      'lastName': contactData.lastName,
      'phoneNumber': contactData.phoneNumber,
      'emailAddress': contactData.emailAddress,
      'username': contactData.username
    };
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    this.storage.get('auth').then((auth) => {
      header.append('AuthToken', auth);
      header.append('SessionID', 'createcontactinfo')
      const requestOpts = new RequestOptions({ headers: header });
      this.http.post(aws_url + '/updateData/', body, requestOpts)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
    })

  }

  StartWatchTest(eventID, contacts, name, endTime, EventName, EventStartDate, StartLat, StartLon, EndLat, EndLon, EventParticipants, EventDescription) {
    var body = [];
    var contacts_array = [];
    for (let c of contacts) {
      contacts_array.push({ 'fname': c.ContactFirstName, 'lname': c.ContactLastName, 'phone': c.ContactPhoneNumber, 'email': c.ContactEmailAddress });
    }
    body.push({
      'eventID': eventID, 'endTime': endTime, 'eventName': EventName, 'startDate': EventStartDate,
      'sLat': StartLat, 'sLon': StartLon, 'eLat': EndLat, 'eLon': EndLon, 'eParts': EventParticipants,
      'eDesc': EventDescription
    });
    body.push(contacts_array);
    body.push(name);
    return new Promise(resolve => {
      this.http.post(aws_tts_url + '/startwatch/', body)
        .subscribe(data => {
          console.log(data['_body']);
          location.reload();
        }
          , error => {
            console.log(error);
            location.reload();
          });
      resolve();

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
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    this.storage.get('auth').then((auth) => {
      header.append('AuthToken', auth);
      header.append('SessionID', 'resetpassword');
      const requestOpts = new RequestOptions({ headers: header });
      this.http.post(aws_url + '/updateData/', user, requestOpts)
        .subscribe(data => {
          console.log(data['body']);
        }, (error) => {
        });
    })

  }

  AccountInfo() {
    //Check if the data has already be created
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      var header = new Headers();
      this.storage.get('userID').then((userid) => {
        this.storage.get('auth').then((auth) => {
          header.append('AuthToken', auth);
          header.append('SessionID', 'getaccount');
          header.append('userID', userid);
          const requestOpts = new RequestOptions({ headers: header });
          this.http.get(aws_url + '/getData/', requestOpts)
            .map(res => res.json())
            .subscribe(data => {
              resolve(data);
            },
              //On error
              (error) => {

              });
        });
      })
    })
  }

  UpdateAccount(accountData) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    this.storage.get('auth').then((auth) => {
      header.append('AuthToken', auth);
      header.append('SessionID', 'updateaccount');
      const requestOpts = new RequestOptions({ headers: header });
      this.http.post(aws_url + '/updateData/', accountData, requestOpts)
        .subscribe(data => {
          //console.log(data['_body']);
        }, error => {
          console.log(error);
        });
    })
  }

  ForgotPassword(data) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json');
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'forgotpassword');
        const requestOpts = new RequestOptions({ headers: header });
        this.http.post(aws_url + '/updateData/', data, requestOpts)
          .subscribe(data => {
            this.data = data;
            //console.log("here", this.data);
            resolve(this.data);
          }, (error) => {
            throw error;
          })
      });
    });
  }
  GetUserName(data) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json');
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'getusername');
        const requestOpts = new RequestOptions({ headers: header });
        this.http.post(aws_url + '/updateData/', data, requestOpts)
          .subscribe(data => {
            this.data = data;
            //console.log(this.data.toString);

            resolve(this.data);
          }, (error) => {
            throw error;
          })
      });
    });
  }

  passwordEmail(data) {
    var header = new Headers();
      this.http.post(aws_tts_url + '/passwordEmail/', data)
        .subscribe(result => {
          //console.log(result);

        }, error => {
          console.log(error);
        });
  }

  confirmCode(data) {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json');
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'getcode');
        const requestOpts = new RequestOptions({ headers: header });
        this.http.post(aws_url + '/updateData/', data, requestOpts)
          .subscribe(data => {
            this.data = data
            resolve(this.data);
          }, (error) => {
            throw error;
          })
      });
    });
  }
}
