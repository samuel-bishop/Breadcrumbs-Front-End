import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
/*
  Generated class for the password page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-password',
   templateUrl: 'password.html',
   providers: [httprequest]
})
export class passwordPage {
  //items for the input
  @ViewChild("username") username;
  @ViewChild("oPassword") oPassword;
  userID: any;
  data: any;
  isValid: any;
  @ViewChild("nPassword") nPassword;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public request: httprequest) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad passwordPage');
    }


  submit() {
    //verify they have values
    if (this.username.value == "") {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
      });
      alert.present();
    } else
      if (this.oPassword.value == "") {
        let alert = this.alertCtrl.create({
          title: "Attention", subTitle: "Old password field is empty", buttons: ["Ok"]
        });
        alert.present();
      } else
        if (this.nPassword.value == "") {
          let alert = this.alertCtrl.create({
            title: "Attention", subTitle: "New password field is empty", buttons: ["Ok"]
          });
          alert.present();
        }

    //check the username
    let user = {
      username: this.username.value,
      password: this.oPassword.value,
      nPassword:this.nPassword.value,
      userID: 0
    }

    //check valid user through API server

    //check API server to see if the user is valid
    this.request.GetUserID(user.username).then((data) => {
      this.userID = data['recordset'][0].UserID;
      //if the user is valid, then check the password
      if (this.userID > 0) {
        this.request.SignIn(user).then((valid) => {
          if (valid) {
            this.request.ResetPassword(user);
            let alert = this.alertCtrl.create({
              title: "Password Updated", subTitle: "Password updated, please log in again", buttons: ["Ok"]
            });
            alert.present();
            this.navCtrl.pop();
          }
          else {
            //password incorrect alert
            let alert = this.alertCtrl.create({
              title: "Attention", subTitle: "Incorrect old password, try again!", buttons: ["Ok"]
            });
            alert.present();
          }
        }).catch((err) => {
          let alert = this.alertCtrl.create({
            title: "Attention", subTitle: err, buttons: ["Ok"]
          });
          alert.present();
          });
      }
    }).catch((err) => {
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: err, buttons: ["Ok"]
      });
      alert.present();
      });
  }
  


}
