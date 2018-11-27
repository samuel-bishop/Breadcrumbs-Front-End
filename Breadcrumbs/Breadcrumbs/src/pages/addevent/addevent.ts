import { Component } from '@angular/core';
import { NavController, NavParams, List, DateTime, LoadingController, AlertController, Alert } from 'ionic-angular';
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
  providers: [httprequest],
  template: `
<form [formGroup]="event" (ngSubmit)="eventForm()">
    <ion-list>

        <ion-item>
            <ion-input placeholder="Event Name" formControlName="name" type="text"></ion-input>
        </ion-item>


        <ion-item>
            <ion-input placeholder="Start Latitude" formControlName="startLat" type="text"></ion-input>
        </ion-item>
        <ion-item>
            <ion-input placeholder="Start Longitude" formControlName="startLong" type="text"></ion-input>

        </ion-item>
        <ion-item>
            <ion-input placeholder="End Latitude" formControlName="endLat" type="text"></ion-input>
        </ion-item>
        <ion-item>
            <ion-input placeholder="End Longitude" formControlName="endLong" type="text"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label color="primary">Start Date/Time</ion-label>
            <ion-datetime formControlName="startDate" [(ngModel)]="todaysDateString" pickerFormat="MMM/D/YY h:mm A" displayFormat="MM/DD/YYYY h:mm A">Start Date</ion-datetime>
        </ion-item>

        <ion-item>
            <ion-label color="primary">End Date/Time</ion-label>
            <ion-datetime formControlName="endDate" [min]="todaysDateString" max="2020-12-31" pickerFormat="MMM/D/YY h:mm A" displayFormat="MM/DD/YYYY h:mm A">Start Date</ion-datetime>
        </ion-item>

        <ion-item>
            <ion-label color="primary">Contact(s)</ion-label>
            <ion-select name="contactsList" [(ngModel)]="contact" multiple="true" formControlName="contactsList">
                <ion-option *ngFor="let contact of contacts" [value]="contact">{{contact.ContactFirstName}} {{contact.ContactLastName}}</ion-option>
            </ion-select>
        </ion-item>

        <ion-item>
            <button ion-button type="button" (click)="addContactClick()">Add New Contact..</button>
        </ion-item>

        <ion-item>
            <ion-input placeholder="Participants (optional)" formControlName="participants" type="text"></ion-input>
        </ion-item>

        <ion-item>
            <ion-input placeholder="Description (required)" formControlName="description" type="text"></ion-input>
        </ion-item>
    </ion-list>

    <button ion-button type="button" (click)="cancelClick()">Cancel</button>
    <button ion-button type="submit" [disabled]="!event.valid">Submit</button>
</form>

`
})

export class addeventPage {
  contacts: any;
  userid: any;
  todaysDate = new Date();
  todaysDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString();
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

  loadContacts() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Contacts...'
    });
    loading.present().then(() => {
      this.request.RequestContacts(loading).then((data) => {
        this.contacts = data['recordset'];
        loading.dismiss();
      },
        () => {
          loading.dismiss();
      });
    });
  } 

  cancelClick() {
    this.navCtrl.pop();
  }

  addContactClick() {
    this.navCtrl.push(addcontactPage);
  }
}
