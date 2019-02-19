import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../Register/Register';
import { passwordPage } from '../password/password';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-LoginPage',
  templateUrl: 'LoginPage.html',
  providers: [httprequest]
})
export class LoginPagePage {
  @ViewChild("username") username;
  @ViewChild("password") password;
  userID: any;
  data: any;
  isValid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public request: httprequest, public storage: Storage) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPagePage');
  }

  signIn() {
    //check to see if username or password are blank
    if (this.username.value == "") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
      });
      alert.present();
    } else
      if (this.password.value == "") {
        let alert = this.alertCtrl.create({
          title: "Attention", subTitle: "Password field is empty", buttons: ["Ok"]
        });
        alert.present();
      }

    //creates a user, storing the input of username and password into the user object
    let user = {
      username: this.username.value,
      password: this.password.value,
      userID: 0
    }

    //check API server to see if the user is valid
    this.request.GetUserID(user).then((data) => {
      this.userID = data['recordset'][0].UserID;
      console.log("uuuussser ID", this.userID);

      //if the user is valid, then check the password
      if (data['recordset'][0].UserID > 0) {
        this.request.SignIn(user).then((data2) => {
          if (data2 == true) { this.navCtrl.push(HomePage); }
          else {
            //password incorrect alert
            let alert = this.alertCtrl.create({
              title: "Attention", subTitle: "Incorrect password, try again!", buttons: ["Ok"]            });
            alert.present();
          }

        });
      }
    });



  }

  signUp() {
    this.navCtrl.push(RegisterPage);
  }

  resetPassword() {
    this.navCtrl.push(passwordPage);
  }


}

