import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, DateTime, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { addcontactPage } from '../addcontact/addcontact';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import { reflector } from '@angular/core/src/reflection/reflection';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng
} from '@ionic-native/google-maps';
import { getTypeNameForDebugging } from '@angular/core/src/facade/lang';


declare var google;
var EditEventMap;
var startLocMarker; //Marker Object for Start Location on Google Map
var endLocMarker; //Marker Object for End Location on Google Map
var isStartOrEndDestination; //Map marker toggle between Start and End Position
var autocomplete;
var places;
@Component({
  selector: 'page-editevent',
  templateUrl: 'editevent.html',
  providers: [httprequest]
})

export class editeventPage {
  //Variables
  contacts: any;
  userid: any;
  todaysDate = new Date();
  todaysDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString(); //Stringified Event Start Date
  endDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 58750).toISOString();  //Stringified Event End Date
  eventName: any;
  eventDescription: any;
  eventParticipants: any;
  eventStartDate: any;
  eventEndDate: any;
  eventContactsList: any;
  eventStartLat: any;
  eventStartLng: any;
  eventEndLat: any;
  eventEndLng: any;
  private event: FormGroup;
  @ViewChild('EditEventMap') EditEventMapEl: ElementRef;
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage) {
    //Initialize google EditEventMap and markers
    this.loadContacts();
    isStartOrEndDestination = false;
    //Creating Forms
    storage.get('userID').then((data) => { this.userid = data; console.log(this.userid); });
    this.event = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startLat: [''],
      startLong: [''],
      endLat: [''],
      endLong: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      contactsList: ['', Validators.required],
      participants: ['']
    });
  }

  ionViewWillLoad() {
    
    //CurrentEvent stores the last submitted event's data
    this.storage.get('activeEvent').then((event) => {
      this.eventName = event.EventName;
      this.eventDescription = event.EventDescription;
      this.eventEndDate = event.EndDate;
      this.eventStartDate = event.EventCreationDate;
      this.eventParticipants = event.EventParticipants;
      this.eventStartLat = event.StartLat;
      this.eventStartLng = event.StartLon;
      this.eventEndLat = event.EndLat;
      this.eventEndLng = event.EndLon;
      /* TODO */
      //Need to populate the contacts list with previously selected items
      //for(var contact in event.contactsList) {
      //  for (var oldcontact in this.contacts) {
      //    if (contact == oldcontact) {

      //    }
      //  }
      //}
    })
  }

  ionViewDidLoad() {
    this.initMap();
    
  }

  initMap() {
    //CurrentEvent stores the last submitted event's data
    this.storage.get('activeEvent').then((event) => {
      //var alert = this.alertCtrl.create({ title: 'Error: Connection Issue', subTitle: `${event}`, buttons: ['ok'] });
      //alert.present();
      let element = this.EditEventMapEl.nativeElement;
      EditEventMap = new google.maps.Map(element, {
        zoom: 10,
        center: { lat: (event.StartLat + event.EndLat)/2, lng: (event.StartLon + event.EndLon)/2},
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      //Create location markers for start and end point of currently active event
      startLocMarker = new google.maps.Marker({ position: new LatLng(event.StartLat, event.StartLon), map: EditEventMap, label: 'S' });
      endLocMarker = new google.maps.Marker({ position: new LatLng(event.EndLat, event.EndLon), map: EditEventMap, label: 'E' });
    }).then(() => {
      /* Listeners */

      // OnClick Listener
      EditEventMap.addListener('click', function (event) {
        if (isStartOrEndDestination == true) {
          if (startLocMarker != null) {
            startLocMarker.setMap(null);
          }
          startLocMarker = new google.maps.Marker({ position: event.latLng, map: EditEventMap, label: 'S' });
        }
        else {
          if (endLocMarker != null) {
            endLocMarker.setMap(null);
          }
          endLocMarker = new google.maps.Marker({ position: event.latLng, map: EditEventMap, label: 'E' });
        }
      }); 
    });
  }

  search() {
    var search = {
      bounds: EditEventMap.getBounds(),
      types: ['lodging']
    };
  }

  //Toggle between dropping "Start" or "End" location markers
  togglePosition() {
    if (isStartOrEndDestination == true) {
      isStartOrEndDestination = false;
      document.getElementById('togglePosition').textContent = "End";
    }
    else {
      isStartOrEndDestination = true;
      document.getElementById('togglePosition').textContent = "Start";
    }
  }

  addMarker(pos: LatLng, title: string) {
    let markerOptions: MarkerOptions = {
      position: pos,
      title: title
    }
    return EditEventMap.addMarker(markerOptions);
  }

  eventForm() {
    let endDate = new Date(this.event.value.endDate);
    if (this.event.value.contactsList == null) {
      var alert = this.alertCtrl.create({ title: 'Error: No Contacts Selected', subTitle: 'Please select at least one contact', buttons: ['ok'] });
      alert.present();
    }
    if (this.event.value.endDate < this.event.value.startDate) {
      var alert = this.alertCtrl.create({ title: 'Error: Time Conflict', subTitle: 'Please check that your dates are not conflicting (End Date should not be before Start Date)', buttons: ['ok'] });
      alert.present();
    }
    else if (endLocMarker.getMap() === null) {
      var alert = this.alertCtrl.create({ title: 'Error: Input Error', subTitle: 'Please select an end point on the EditEventMap', buttons: ['ok'] });
      alert.present();
    }
    else {
      let loading = this.loadingCtrl.create({
        content: 'Loading Event...'
      });

      this.storage.set('newEventSubmit', true)
        .then(() => {
          var contactsListString = "";
          for (let i = 0; i < this.event.value.contactsList.length; i++) {
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
          console.log(`startLocPos- lat: ${startLocMarker.getPosition().lat()} lng: ${startLocMarker.getPosition().lng()}`);
          let eventData = {
            "userid": this.userid,
            "name": this.event.value.name,
            "description": this.event.value.description,
            "startLat": startLocMarker.getPosition().lat(),
            "startLong": startLocMarker.getPosition().lng(),
            "endLat": endLocMarker.getPosition().lat(),
            "endLong": endLocMarker.getPosition().lng(),
            "startDate": this.event.value.startDate,
            "endDate": this.event.value.endDate,
            "contactsList": contactsListString,
            "participants": this.event.value.participants
          }
          this.storage.set('activeEvent', eventData);
          return eventData;
        })
        .then((eventData) => {
          this.storage.set('newEventSubmit', true)
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
