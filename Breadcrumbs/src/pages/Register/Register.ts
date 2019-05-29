import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
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
  data: Object;
  userID: any;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public request: httprequest, public storage: Storage) { }

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
          //if (this.phonenumber.value == "") {
          //  let alert = this.alertCtrl.create({
          //    title: "Attention", subTitle: "Phone number field is empty", buttons: ["Ok"]
          //  });
          //  alert.present();
          //} else
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
                let data2 = {
                  username: this.username.value,
                  password: this.password.value,
                  "firstName": this.firstName.value,
                  "lastName": this.lastName.value,
                  "emailAddress": this.email.value,
                  //"phoneNumber": this.phonenumber.value
                }

                this.request.CreateUser(data2);
                this.request.GetUserID(data2).then((data) => {
                  this.userID = data['recordset'][0].UserID;
                  this.request.InsertContactInfo(this.userID, data2);
                });
              }

    let alert = this.alertCtrl.create({
      title: "User Created", subTitle: "Usercreated, please log in ", buttons: ["Ok"]
    });
    alert.present();
    this.navCtrl.pop();
  }
  
 
      


  Cancel() {
    this.navCtrl.pop();
  }

}
