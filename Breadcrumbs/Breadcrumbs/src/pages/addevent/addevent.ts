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
  }  from '@ionic-native/google-maps';
import { getTypeNameForDebugging } from '@angular/core/src/facade/lang';

declare var google;
var AddEventMap;
var startLocMarker; //Marker Object for Start Location on Google Map
var endLocMarker; //Marker Object for End Location on Google Map
var isStartOrEndDestination; //Map marker toggle between Start and End Position
var autocomplete;
var places;
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
    storage.get('userID').then((data) => { this.userid = data; console.log(this.userid); });
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

  initMap() {
    //Init Google Maps API objects
    this.currentLat = 42.2587;
    this.currentLng = 121.7836;
    let geo = new Geolocation();
    geo.getCurrentPosition().then((loc) => {
      if (loc != null) {
        this.currentLat = loc.coords.latitude;
        this.currentLng = loc.coords.longitude;
      }
      console.log(`geo - Lat: ${loc.coords.latitude}, Lng: ${loc.coords.longitude}`);
    }).then(() => {
      let element = this.AddEventMapEl.nativeElement;
      AddEventMap = new google.maps.Map(element, {
        zoom: 7,
        center: { lat: this.currentLat, lng: this.currentLng },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      if (this.currentLat != 0.0 && this.currentLng != 0.0) {
        startLocMarker = new google.maps.Marker({ position: new LatLng(this.currentLat, this.currentLng), map: AddEventMap, label: 'S' });
      }
    }).then(() => {
      //console.log(`MapType: ${getTypeNameForDebugging(AddEventMap)}`);
      //Listeners for the google maps
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
      }); //var marker = new google.maps.Marker({ position: event.latLng, AddEventMap: AddEventMap });
      });

    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(this.currentLat - 0.5, this.currentLng),
      new google.maps.LatLng(this.currentLat, this.currentLng + 0.5));
    var input = document.getElementById('searchInput');
    var options = {
      bounds: defaultBounds,
      types: ['address']
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);
    //places = new google.maps.places.PlacesServices(AddEventMap);

    //autocomplete.addListener('place_changed', function () {
    //  var place = autocomplete.getPlace();
    //  if (place.geometry) {
    //    AddEventMap.panTo(place.geometry.location);
    //    AddEventMap.setZoom(15);
    //    this.search();
    //  } else {
        
    //  }
    //})
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
    else if (endLocMarker.getMap() === null)
    {
      var alert = this.alertCtrl.create({ title: 'Error: Input Error', subTitle: 'Please select an end point on the AddEventMap', buttons: ['ok'] });
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
          return eventData;
        })
        .then((eventData) => {
          this.storage.set('lastState', 'addeventsubmit')
            .then(() => {
             //CurrentEvent stores the last submitted event's data
              this.storage.set('CurrentEvent', eventData);
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
