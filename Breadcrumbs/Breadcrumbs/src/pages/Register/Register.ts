import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { httprequest } from '../../httprequest';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-Register',
    templateUrl: 'Register.html',
    providers: [httprequest]
})
export class RegisterPage {
  @ViewChild("firstName") firstName;
  @ViewChild("lastName") lastName;
  @ViewChild("email") email;
  @ViewChild("mobile") phonenumber;
  @ViewChild("username") username;
  @ViewChild("password") password;
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public request: httprequest) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

  Register() {
      //check fields to see if they are valid
    if (this.firstName.value == "") {
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
          if (this.phonenumber.value == "") {
            let alert = this.alertCtrl.create({
              title: "Attention", subTitle: "Phone number field is empty", buttons: ["Ok"]
            });
            alert.present();
          } else
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
              } else
              //submit data if all feilds are valid
              {
                let data = {
                  username: this.username.value,
                  password: this.password.value,
                }
                this.request.CreateUser(data);
              }
      
  }

  Cancel() {
    this.navCtrl.pop();
  }

}
