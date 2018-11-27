import { Component } from '@angular/core';
import { NavController, NavParams, List, DateTime, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { addcontactPage } from '../addcontact/addcontact';
import { httprequest } from '../../httprequest';
import { Validators, FormBuilder, FormGroup, NgControl, NgModel } from '@angular/forms';

/*
  Generated class for the editevent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editevent',
  templateUrl: 'editevent.html',
  providers: [httprequest],
  //selector: NgModel
})
export class editeventPage {
  userid: any;
  contacts: any;
  todaysDate = new Date();
  currentEvent: any;
  evName: any;
  todaysDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString();
  private event: FormGroup;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public request: httprequest, public storage: Storage, public formBuilder: FormBuilder/*, private model: NgControl*/) {
    this.storage.set('newEventSubmit', true);
    this.storage.set('userID', 1);
    this.storage.get('userID').then((data) => { this.userid = data; });
    storage.get('userID').then((data) => { this.userid = data; console.log(this.userid); });
    //this.ionViewWillEnter();
    this.loadContacts();



    //this.storage.set('data', this.ionViewWillEnter());


    this.getCurrent();

    

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

    this.presentLoadingContacts();
  }

  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad editeventPage');
  //}

  getActiveEvent() {
    this.request.RequestActiveEvent()
      .then(data => {
        console.log("getActiveEvent()");
        console.log(data);
        this.storage.set('activeEvent', data['recordset'][0]);
      })
  }

  getCurrent() {
    var newEvent;
    //create enums for names of months and days
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    //function to convert SQL Server smalldatetime to a more human readable string - need to move this outside ionViewWillEnter and make global.
    function formatTime(datetime: string): string {
      let year: string = (new Date(datetime).getFullYear()).toString();
      let month: string = monthNames[(new Date(datetime).getMonth())];
      let weekday: string = dayNames[(new Date(datetime).getDay())];
      let date: string = (new Date(datetime).getDate()).toString();
      let time: string = new Date(datetime).toISOString().slice(11, 16);
      let hourInt: number = parseInt(time.slice(0, 2));
      if (hourInt > 12) {
        hourInt -= 12;
        time = hourInt.toString() + time.slice(2) + ' PM';
      }
      else time = time + ' AM';
      if (time.startsWith('0')) time = time.slice(1);

      let result: string = weekday + ', ' + month + ' ' + date + ', ' + year + ' at ' + time;
      return result;
    }

    this.storage.get('newEventSubmit').then((data) => {
      newEvent = data;
      console.log("newEventBool: " + newEvent);
      if (newEvent === true || document.getElementById("activeEventContent").innerText === "") {
        this.getActiveEvent();
        this.getActiveEvent();
        this.getActiveEvent();
        this.storage.set('newEventSubmit', false);
        this.storage.get('activeEvent').then((data) => {
          console.log("activeEvent");
          console.log(data);
          console.log("EventName: " + data.EventName);
          document.getElementById("viewEventTitle").textContent = data.EventName;
          document.getElementById("EventStartDateLabel").textContent = formatTime(data.EventStartDate);
          document.getElementById("EventEndDateLabel").textContent = formatTime(data.EndDate);
          document.getElementById("EventPosLatLabel").textContent = data.PositionLatitude;
          document.getElementById("EventPosLonLabel").textContent = data.PositionLongitude;
          document.getElementById("EventParticipantsLabel").textContent = data.EventParticipants ? data.EventParticipants : '(blank)';
          document.getElementById("EventDescriptionLabel").textContent = data.EventDescription ? data.EventDescription : '(blank)';
          this.evName = data.EventName;
        });

      }

    });
  }




  eventForm() {
    this.storage.set('newEventSubmit', true);
    console.log("Set eventSubmit to true");
    var contactsListString = "";
    for (var i = 0; i < this.event.value.contactsList.length; i++) {
      if (i != 0) {
        contactsListString += ",";
      }
      if (this.event.value.contactsList[i] != "") {
        contactsListString += this.event.value.contactsList[i].EmergencyContactID;
      }
    }

    console.log(contactsListString);

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
    this.request.InsertEvent(eventData);
    this.presentLoadingEvent();
    this.navCtrl.pop();
  }

  presentLoadingContacts() {
    let loading = this.loadingCtrl.create({
      content: 'Loading contacts...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 250);
  }

  presentLoadingEvent() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Event...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

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
