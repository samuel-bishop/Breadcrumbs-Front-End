import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, DateTime, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { addcontactPage } from '../addcontact/addcontact';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import {
  MarkerOptions,
  LatLng
} from '@ionic-native/google-maps';

declare var google;
var AddEventMap;
var startLocMarker; //Marker Object for Start Location on Google Map
var endLocMarker; //Marker Object for End Location on Google Map
var isStartOrEndDestination; //Map marker toggle between Start and End Position
var currentLat = 42.2587;
var currentLng = 121.7836;

@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html', 
  providers: [httprequest]
})

export class addeventPage {
  //Variables
  contacts: any;
  userid: any;
  todaysDate = new Date();
  todaysDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString(); //Stringified Event Start Date
  endDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 58750).toISOString();  //Stringified Event End Date
  currentLng: any; //Location Data for Longitude of Clients Current Position
  currentLat: any; //Location Data for Latitude of Clients Current Position
  private event: FormGroup;
  @ViewChild('AddEventMap') AddEventMapEl: ElementRef;
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage) {
    isStartOrEndDestination = false;
    //Creating Forms
    storage.get('userID').then((data) => { this.userid = data; });
    this.loadContacts();
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
      var alert = this.alertCtrl.create({ title: 'Error: Input Error', subTitle: 'Please select an end point on the AddEventMap', buttons: ['ok'] });
      alert.present();
    }

    else {
      let loading = this.loadingCtrl.create({
        content: 'Loading Event...'
      });
      var contactsListString = "";
      for (let i = 0; i < this.event.value.contactsList.length; i++) {
        if (i != 0) {
          contactsListString += ",";
        }
        if (this.event.value.contactsList[i] != "") {
          contactsListString += this.event.value.contactsList[i].EmergencyContactID;
        }
      }
      //console.log(`startLocPos- lat: ${startLocMarker.getPosition().lat()} lng: ${startLocMarker.getPosition().lng()}`);
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
      //CurrentEvent stores the last submitted event's data
      this.storage.set('LastState', 'EventSubmit').then(() => {
        this.request.InsertEvent(eventData).then(() => {
          this.navCtrl.pop();
          location.reload();
        });
      });
    }
  }

  initMap() {
    //Init Google Maps API objects
    navigator.geolocation.getCurrentPosition((position) => {
        currentLat = position.coords.latitude;
        currentLng = position.coords.longitude;
    }, (error) => {
      currentLat = 42.2587;
      currentLng = 121.7836;
      let alert = this.alertCtrl.create({
        title: "Attention", subTitle: `We can't access your location`, buttons: ["Ok"]
      });
      alert.present();
      });

    this.loadMap(currentLat, currentLng);

    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(currentLat - 0.5, currentLng),
      new google.maps.LatLng(currentLat, currentLng + 0.5));
    var input = document.getElementById('searchInput');
    var options = {
      bounds: defaultBounds,
      types: ['address']
    };
  }

  loadMap(lat, lng) {
    let element = this.AddEventMapEl.nativeElement;
    AddEventMap = new google.maps.Map(element, {
      zoom: 13,
      center: { lat: lat, lng: lng },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    if (lat != 0.0 && lng != 0.0) {
      startLocMarker = new google.maps.Marker({ position: new LatLng(lat, lng), map: AddEventMap, label: 'S' });
    }

    /* Listeners */
    AddEventMap.addListener('click', function (event) {
      if (isStartOrEndDestination == true) {
        if (startLocMarker != null) {
          startLocMarker.setMap(null);
        }
        startLocMarker = new google.maps.Marker({ position: event.latLng, map: AddEventMap, label: 'S' });
      }
      else {
        if (endLocMarker != null) {
          endLocMarker.setMap(null);
        }
        endLocMarker = new google.maps.Marker({ position: event.latLng, map: AddEventMap, label: 'E' });
      }
    });
  }

  ionViewDidLoad() {
    //Initialize google AddEventMap and markers
    this.initMap();
  }

  search() {
    var search = {
      bounds: AddEventMap.getBounds(),
      types: ['lodging']
    };
  }

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
    return AddEventMap.addMarker(markerOptions);
  }

  ionViewWillLoad() {

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
