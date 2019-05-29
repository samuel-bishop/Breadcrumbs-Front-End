import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { httprequest } from '../../httprequest';
import { LoginPagePage } from '../LoginPage/LoginPage';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

/*
  Generated class for the forgotPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgotPassword',
  templateUrl: 'forgotPassword.html',
  providers: [httprequest]

})

export class forgotPasswordPage {
    //items for the input
  @ViewChild("email") email;
  @ViewChild("password") password;
  @ViewChild("confirmPassword") confirmPassword;
  @ViewChild("code") code;
  gotCode: boolean  =false;
  shouldHeight: any = document.body.clientHeight + 'px';
  isMobile: boolean;
  private emailCheck: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public alertCtrl: AlertController, private platform: Platform, public formBuilder: FormBuilder) {
    this.emailCheck = this.formBuilder.group({
      email: ['', Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$')],
    });
    if (platform.is('mobile')) {
  this.isMobile = true;
}
    else this.isMobile = false;
}
    ionViewDidLoad() {
        console.log('ionViewDidLoad forgotPasswordPage');
    }

  submit() {


    if (this.email.value == "") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Email field is empty", buttons: ["Ok"]
      });
      alert.present();
    } else {
      let user = {
        email: this.email.value,
        username: null,
        string:  null
      }
      this.request.GetUserName(user).then((result) => {
        user.username = result;
        this.request.ForgotPassword(user).then((result) => {
          user.string = result;
          console.log(result);
          let alert = this.alertCtrl.create({
            title: "Submitted",
            message: "If this email is registered with an account, and email will be sent, follow the instructions",
            buttons: ['Ok']
          });
          alert.present();

          if (result) {
            
            this.request.passwordEmail(user);
          }
        });
      });

    }

 
  }

  gotCodeIf() {
    this.gotCode = !this.gotCode;
  }

  back() {
    this.navCtrl.push(LoginPagePage);
  }

  submitReset() {
    if (this.code.value == "" || this.password.value == "" || this.confirmPassword.value == "") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Please fill out all fields", buttons: ["Ok"]
      });
      alert.present();
    } else if (this.password.value != this.confirmPassword.value) {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Passwords do not match", buttons: ["Ok"]
      });
      alert.present();
    } else {

      let user = {
        userCode: this.code.value,
        username: null,
        nPassword: this.password.value,
      }
      this.request.confirmCode(user).then((result) => {
        user.username = result["_body"].toString();
        this.request.ResetPassword(user);
        let alert = this.alertCtrl.create({
          title: "Password Updated", subTitle: "Password updated, please log in again", buttons: ["Ok"]
        });
        alert.present();
        this.navCtrl.pop();
      });
      

    }
  }
  
}
