import { Component } from '@angular/core';
import { NavController, NavParams, List, DateTime } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { addcontactPage } from '../addcontact/addcontact';
import { httprequest } from '../../httprequest';

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
        <ion-input placeholder="Destination" formControlName="destination" type="text"></ion-input>
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
        <ion-select [(ngModel)]="contact" multiple="true" formControlName="contactsList">
          <ion-option *ngFor="let contact of contacts" [value]="contact">{{contact.ContactFirstName}} {{contact.ContactLastName}}</ion-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <button ion-button (click)="addContactClick()">Add New Contact..</button>
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
  todaysDate = new Date();
  todaysDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString();
  private event: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public formBuilder : FormBuilder)
  {
    this.loadContacts(1);
    this.event = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      contactsList: [''],
      participants: ['']
      
    });
    //console.log(this.contacts);
    
  }

  eventForm() {
    let eventData = {
      "userid": 1,
      "name": this.event.value.name,
      "description": this.event.value.description,
      "destination": this.event.value.destination,
      "startDate": this.event.value.startDate,
      "endDate": this.event.value.endDate,
      "contactsList": this.event.value.contactsList,
      "participants": this.event.value.participants
    }
    this.request.InsertEvent(1, this.event.value);
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad addeventPage');
    }

  loadContacts(userid) {
    this.request.RequestContacts(userid)
      .then(data => {
        this.contacts = data['recordset'];
        
      })
  }

  cancelClick() {
    this.navCtrl.pop();
  }

  addContactClick() {
    this.navCtrl.push(addcontactPage);
  }

}
