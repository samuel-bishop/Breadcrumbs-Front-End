import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, Platform } from 'ionic-angular';


var aws_url = 'https://www.breadcrumbsapp.net'
var aws_tts_url = 'http://35.174.49.106:4605'

/***************************************************
 * Overview: This class is a helper class for
 * connecting to Breadcrumbs API server as well as 
 * its Timer server
 **************************************************/

@Injectable()
export class httprequest {
  data: Object;
  constructor(public alertCtrl: AlertController, private platform: Platform, public loadingCtrl: LoadingController, public http: Http, public storage: Storage) {
  }


  //Get the authentication token given a username
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
          throw error;
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
              throw error;
              });
        });
      })
    })
  }

  //Get the top 10 inactive events from the database
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
              throw error;
            });
        });
      })
    })
  }

  //Update a contacts information with newly created info
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
          throw error;
        });
    });
  }

  //Delete a contact from the a users list of contacts
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
          throw error;
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
                throw error;
              });
        });
      })
    })
  }

  //Retrieve all the favorite events from a user
  RequestFavoriteEvents() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.storage.get('userID').then((userid) => {
        //var body = { 'userID': userid };
        this.storage.get('auth').then((auth) => {
          var header = new Headers();
          header.append('AuthToken', auth);
          header.append('SessionID', 'getfavoriteevents')
          header.append('userID', userid);
          var requestOpts = new RequestOptions({ headers: header });
          this.http.get(aws_url + '/getData/', requestOpts)
            .map(res => res.json())
            .subscribe(data => {
              this.data = data;
              resolve(this.data);
            }, (error) => {
              throw error;
            });
        });
      });
    })
  }


  //Request inactive events
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
            }, (error) => {
              throw error;
            });
        });
      });
    })
  }

  //Add a new event to the database for a user, setting any
  //current event to inactive
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
            throw error;
          });
        resolve('Success');
      });
    });
  }

  //Insert a new contact for a user
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
          throw error;
        });
    });
  }

  //Get all contacts for a users specific event
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
          }, (error) => {
            throw error;
          });
      })
    })
  }

  //Disable a user, deleting them from use but keeping them in
  //the database
  DisableUser() {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json');
    this.storage.get('userID').then((userid) => {
      this.storage.get('auth').then((auth) => {
        header.append('AuthToken', auth);
        header.append('SessionID', 'disableuser');
        const requestOpts = new RequestOptions({ headers: header });
        let user = { userid: userid }
        this.http.post(aws_url + '/updateData/', user, requestOpts)
          .subscribe(data => {
            console.log(data['_body']);
          }, error => {
            throw error;
          });
      })
    })
  }

  //Check the connection to the api server, returning true if valid connection
  //is made
  CheckConnection() {
    return new Promise(resolve => {
      var header = new Headers();
      header.append("Accept", 'application/json');
      header.append('Content-Type', 'application/json');
      header.append('AuthToken', '0');
      header.append('SessionID', 'checkconnection');
      const requestOpts = new RequestOptions({ headers: header });
      this.http.get(aws_url + '/getData/', requestOpts)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        },
        (error) => {
          let alert = this.alertCtrl.create({
            title: "Error", subTitle: `Something went wrong, we can not establish connection to our servers, please refresh the page or try again later..`, buttons: ["Ok"]
          });
          alert.present();
            throw error;
          });
    })
  }

  //Disable an event for a user
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
            throw error;
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
            throw error;
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

  //Get a users account information, passing in their username
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
              throw error;
            });
      })
    })
  }

  //Get just a users id from their username
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
              throw error;
            });
      });
    })
  }

  //Validate a users log in attempt
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
          }, (error) => {
            throw error;
          });
      });
    })
  }

  //Add a new contact for a user
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
          throw error;
        });
    })
  }


  //Start a timer
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
            //throw error;
            location.reload();
          });
      resolve();

    });
  }


  //Cancels a timer
  CancelWatch(eventID) {
    var body = { 'eventID': eventID }
    this.http.post(aws_tts_url + '/cancelwatch/', body)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }

  //Reset a users a password
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
          throw error;
        });
    })

  }


  //Get a users account info (redundant)
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
                throw error;
              });
        });
      })
    })
  }

  //Update a users account information
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
          throw error;
        });
    })
  }

  //????
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
            resolve(this.data);
          }, (error) => {
            throw error;
          })
      });
    });
  }

  //Retrieve a username 
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

  //Send an email prompting a user to change their password
  passwordEmail(data) {
    var header = new Headers();
      this.http.post(aws_tts_url + '/passwordEmail/', data)
        .subscribe(result => {
          //console.log(result);
        }, error => {
          throw error;
        });
  }

  //Validates a password reset code
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
