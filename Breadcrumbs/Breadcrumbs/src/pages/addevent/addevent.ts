import { Component } from '@angular/core';
import { NavController, NavParams, DateTime, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { addcontactPage } from '../addcontact/addcontact';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { reflector } from '@angular/core/src/reflection/reflection';

/*
  Generated class for the addevent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
  providers: [httprequest]
})

export class addeventPage {
  contacts: any;
  userid: any;
  todaysDate = new Date();
  todaysDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString();
  endDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 58750).toISOString();
  
  private event: FormGroup;
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage) {
    storage.get('userID').then((data) => { this.userid = data; console.log(this.userid); });
    this.loadContacts();
    this.event = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startLat: ['', Validators.required],
      startLong: ['', Validators.required],
      endLat: ['', Validators.required],
      endLong: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      contactsList: [''],
      participants: ['']
    });
  }

  eventForm() {
    let endDate = new Date(this.event.value.endDate);
    if (this.event.value.endDate < this.event.value.startDate || endDate < this.todaysDate) {
      var alert = this.alertCtrl.create({ title: 'Error: Time Conflict', subTitle: 'Please check that your dates are not conflicting (End Date should not be before Start Date)', buttons: ['ok'] });
      alert.present();
    }
    else {
      let loading = this.loadingCtrl.create({
        content: 'Loading Event...'
      });

      this.storage.set('newEventSubmit', true)
        .then(() => {
          var contactsListString = "";
          for (var i = 0; i < this.event.value.contactsList.length; i++) {
            if (i != 0) {
              contactsListString += ",";
            }
            if (this.event.value.contactsList[i] != "") {
              contactsListString += this.event.value.contactsList[i].EmergencyContactID;
            }
          }
          return contactsListString;
        })
        .then((contactsListString) => {
          let eventData = {
            "userid": this.userid,
            "name": this.event.value.name,
            "description": this.event.value.description,
            "startLat": this.event.value.startLat,
            "startLong": this.event.value.startLong,
            "endLat": this.event.value.endLat,
            "endLong": this.event.value.endLong,
            "startDate": this.event.value.startDate,
            "endDate": this.event.value.endDate,
            "contactsList": contactsListString,
            "participants": this.event.value.participants
          }
          return eventData;
        })
        .then((eventData) => {
          this.storage.set('lastState', 'addeventsubmit')
            .then(() => {
              this.request.InsertEvent(eventData);
              this.navCtrl.pop();
            });
        })
    }
  }

  loadContacts() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Contacts...'
    });

    loading.present().then(() => {
      this.request.RequestContacts().then((data) => {
        this.contacts = data['recordset'];
      });
      loading.dismiss();
    });
  } 

  cancelClick() {
    this.navCtrl.pop();
  }

  addContactClick() {
    this.navCtrl.push(addcontactPage);
  }
}
