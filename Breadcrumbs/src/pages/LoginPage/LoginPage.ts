import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { forgotPasswordPage } from '../forgotPassword/forgotPassword';
import { infoPromptPage } from '../infoPrompt/infoPrompt';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

function GetEvents(worker, request, storage) {
  return new Promise(function (resolve, reject) {
    worker.PullActiveEvent(request, storage);
    worker.PullInactiveEvents(request, storage);
    resolve();
  });
}


@Component({
  selector: 'page-LoginPage',
  templateUrl: 'LoginPage.html',
  providers: [httprequest]
})
export class LoginPagePage {
  @ViewChild("firstName") firstName;
  @ViewChild("lastName") lastName;
  @ViewChild("email") email;
  @ViewChild("mobile") phonenumber;
  @ViewChild("username") username;
  @ViewChild("password") password;
  isRegister: boolean = false;
  isConnected: boolean;
  userID: any;
  validUser: any;

  private registration: FormGroup;

  //userValidation: User; 
  data: string;
  shouldHeight: any = document.body.clientHeight + 'px';
  isMobile: boolean;
  constructor(public navCtrl: NavController, public request: httprequest, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, public storage: Storage, public loadingCtrl: LoadingController, public formBuilder: FormBuilder) {
    this.registration = this.formBuilder.group({
      username: ['', Validators.pattern('^[A-Za-z0-9_.]*$')],
      password: ['',],
      confirmpassword: ['',],
      firstname: ['',],
      lastname: ['',],
      email: ['', Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')],
    });
    this.isConnected = false;
    this.request.CheckConnection().then((data) => {
      if (data != undefined) {
        this.isConnected = data['active'];
      }
    }).catch(() => {
      let alert = this.alertCtrl.create({
        title: "Error", subTitle: `Something went wrong, we can not establish connection to our servers, please refresh the page or try again later..`, buttons: ["Ok"]
      });
      alert.present();
      this.isConnected = false;
    });
    if (platform.is('mobile')) {
      this.isMobile = true;
    }
    else this.isMobile = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPagePage');
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: `Please ensure that your location is enabled before logging in`, buttons: ["Ok"]
      });
      alert.present();
  }

  signIn() {
    if (this.username.value == "") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
      });
      alert.present();
    }
    else if (this.username.length > 30)
    {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Username must be less than 30 characters.", buttons: ["Ok"]
      });
      alert.present();
    }
    else if (this.password.value == "") {
        let alert = this.alertCtrl.create({
          title: "Attention", subTitle: "Password field is empty", buttons: ["Ok"]
        });
        alert.present();
    }
    else this.validateUser();
  }

  Register() {
    this.request.GetUserID(this.username.value).then((data) => {
      if (data['recordset'][0] != undefined && data['recordset'][0].UserID > 0) {
        let alert = this.alertCtrl.create({
          title: "Attention", subTitle: "This username already exists", buttons: ["Ok"]
        });
        alert.present();
      }
      else {
        //check fields to see if they are valid
        if (this.firstName.length > 100 || this.lastName.length > 100) {
          let alert = this.alertCtrl.create({
            title: "Attention", subTitle: "First and last name must be less than 100 characters.", buttons: ["Ok"]
          });
          alert.present();
        }
        else if (this.firstName.value == "") {
          let alert = this.alertCtrl.create({
            title: "Attention", subTitle: "First Name field is empty", buttons: ["Ok"]
          });
          alert.present();
        } else
          if (this.lastName.value == "") {
            let alert = this.alertCtrl.create({
              title: "Attention", subTitle: "Last Name field is empty", buttons: ["Ok"]
            });
            alert.present();
          } else
            if (this.email.value == "") {
              let alert = this.alertCtrl.create({
                title: "Attention", subTitle: "Email field is empty", buttons: ["Ok"]
              });
              alert.present();
            } else
              if (this.username.value == "") {
                let alert = this.alertCtrl.create({
                  title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
                });
                alert.present();
              } else
                if (this.username.value.length > 30) {
                  let alert = this.alertCtrl.create({
                    title: "Attention", subTitle: "Usernames are less than 30 characters.", buttons: ["Ok"]
                  });
                  alert.present();
                }
                else if (this.firstName.value.length > 100 || this.lastName.value.length > 100) {
                  let alert = this.alertCtrl.create({
                    title: "Attention", subTitle: "First and Last names are less than 100 characters.", buttons: ["Ok"]
                  });
                  alert.present();
                }
                else if (this.password.value == "") {
                  let alert = this.alertCtrl.create({
                    title: "Attention", subTitle: "Password field is empty", buttons: ["Ok"]
                  });
                  alert.present();
                } else { //submit data if all feilds are valid 
                  
                  let data2 = {
                    username: this.username.value,
                    password: this.password.value,
                    email: this.email.value,
                    firstname: this.firstName.value,
                    lastname: this.lastName.value,
                    userID: -1
                  }
                  let loading = this.loadingCtrl.create({
                    content: 'Registering..'
                  });
                  loading.present().then(() => {
                    this.request.CreateUser(data2).then(() => {
                      location.reload();
                    }).catch(() => {
                      let alert = this.alertCtrl.create({
                        title: "Attention", subTitle: "Something went wrong", buttons: ["ok"]
                      });
                      alert.present();
                    });
                  });
                }
      }
      });
  }

  GetUser(loading) {
    this.request.GetAuth(this.username.value.toLowerCase()).then((auth) => {
      this.storage.set('auth', auth['recordset'][0].Auth).then(() => {
        this.request.GetUser(this.username.value.toLowerCase()).then((user) => {
          this.storage.set('user', user['recordset'][0]).then(() => {
            this.storage.set('userID', user['recordset'][0].UserID).then(() => {
              loading.dismiss();
              this.navCtrl.setRoot(HomePage);
            })
          });
        })
      })
    });
  }

  signUp() {
    this.isRegister = true;
  }

  cancelRegister() {
    this.isRegister = false;
  }

  initialClick() {
    this.signIn();
  }

  forgotPassword() {
    this.navCtrl.push(forgotPasswordPage, { animate: false });
  }

  infoPrompt() {
    this.navCtrl.push(infoPromptPage, { animate: false });
  }

  validateUser() {
    let user = {
      username: this.username.value.toLowerCase(),
      password: this.password.value
    }
    let loading = this.loadingCtrl.create({
      content: 'Retrieving account information...'
    });
    loading.present().then(() => {

      //need to look over this logic later
      //(why get users information before validating user?)
      this.request.GetUserID(user.username).then((data) => {
        if (data['recordset'][0].UserID > 0) {
          this.request.SignIn(user).then((isValid) => {
            if (isValid) this.GetUser(loading);
            else {
              let alert = this.alertCtrl.create({
                title: "Attention", subTitle: `Wrong Password`, buttons: ["Ok"]
              });
              alert.present();
              loading.dismiss();
            }
          });
        }
        else {  
          let alert = this.alertCtrl.create({
            title: "Attention", subTitle: `Wrong Username`, buttons: ["Ok"]
          });
          alert.present();
          loading.dismiss();
        }
      }).catch(() => {
        let alert = this.alertCtrl.create({
          title: "Attention", subTitle: `Wrong Username`, buttons: ["Ok"]
        });
        alert.present();
        loading.dismiss();
        });
    });
  }
}



