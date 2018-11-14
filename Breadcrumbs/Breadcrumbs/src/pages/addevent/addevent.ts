import { Component } from '@angular/core';
import { NavController, NavParams, List, DateTime } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { addcontactPage } from '../addcontact/addcontact';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';

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
  private event: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage)
  {

    storage.get('userID').then((data) => { this.userid = data });
    this.loadContacts();
    
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
      "userid": this.userid,
      "name": this.event.value.name,
      "description": this.event.value.description,
      "destination": this.event.value.destination,
      "startDate": this.event.value.startDate,
      "endDate": this.event.value.endDate,
      "contactsList": this.event.value.contactsList,
      "participants": this.event.value.participants
    }
    this.request.InsertEvent(this.storage.get('userID'), this.event.value);
    }

    ionViewDid

  loadContacts() {
    this.request.RequestContacts(1)
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
