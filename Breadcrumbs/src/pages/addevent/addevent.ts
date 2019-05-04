import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, DateTime, LoadingController, AlertController, Alert, Select } from 'ionic-angular';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { addcontactPage } from '../addcontact/addcontact';
import { httprequest } from '../../httprequest';
import { Storage } from '@ionic/storage';
import {
  MarkerOptions,
  LatLng
} from '@ionic-native/google-maps';
import { Event } from '../../datastructs';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { LocalNotifications } from 'ionic-native';

declare var google;
var AddEventMap;
var startLocMarker; //Marker Object for Start Location on Google Map
var endLocMarker; //Marker Object for End Location on Google Map
var isStartLocation; //Map marker toggle between Start and End Position
var currentLat;
var currentLng;
var aws_url = 'http://18.235.156.238:4604'

@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
  providers: [httprequest, Geolocation]
})

export class addeventPage {
  //Variables
  contacts: any;
  userid: any;
  todaysDate = new Date();
  //Convert UTC to local timezone

  todaysDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString();
  endDateString: String = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 57500).toISOString();//Stringified Event End Date

  currentLng: any; //Location Data for Longitude of Clients Current Position
  currentLat: any; //Location Data for Latitude of Clients Current Position
  eventName: any = "";
  eventDesc: any = "";
  eventPart: any = "";
  isVisible: boolean = false;
  data: any;
  activeEventName: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  geocoder: any;
  selectedItemsCount: number;

  private event: FormGroup;
  @ViewChild('contactsList') select: Select;
  @ViewChild('AddEventMap') AddEventMapEl: ElementRef;

  constructor(public alertCtrl: AlertController, public http: Http, private zone: NgZone, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public formBuilder: FormBuilder, public storage: Storage, public geo: Geolocation) {
    //Initialize google AddEventMap and markers
    this.initMap();
    this.selectedItemsCount = 0;
    isStartLocation = false;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    //Creating Forms
    storage.get('userID').then((data) => { this.userid = data; });
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

    this.storage.get('EditEvent').then((edit) => {
      if (edit == true) {
        this.storage.get('activeEvent').then((event) => {
          this.eventName = event.EventName;
          this.eventDesc = event.EventDesc;
          this.eventPart = event.EventParticipants;
        });
      }
      else {
        this.eventName = "Event Name";
        this.eventDesc = "Event Description";
        this.eventPart = "Event Participants";
      }
    });
  }

  ionViewWillEnter() {
    this.loadContacts();
  }

  eventForm() {
    let endDate = new Date(this.event.value.endDate);
    if (this.event.value.contactsList == null) {
      var alert = this.alertCtrl.create({ title: 'Error: No Contacts Selected', subTitle: 'Please select at least one contact', buttons: ['ok'] });
      alert.present();
    }
    else if (this.event.value.contactsList.length > 3) {
      var alert = this.alertCtrl.create({ title: 'Error: Max of 3 Contacts Allowed', subTitle: 'Uncheck some contacts', buttons: ['ok'] });
      alert.present();
    }
    else if (this.event.value.endDate < this.event.value.startDate) {
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

      let StartDate = new Date(this.event.value.startDate);
      let StartDateISO = new Date((StartDate.getTime() + StartDate.getTimezoneOffset() * 60000)).toISOString();
      let EndDate = new Date(this.event.value.endDate);
      let EndDateISO = new Date((EndDate.getTime() + EndDate.getTimezoneOffset() * 60000)).toISOString();


      let eventData = {
        "userid": this.userid,
        "name": this.event.value.name,
        "description": this.event.value.description,
        "startLat": startLocMarker.getPosition().lat(),
        "startLong": startLocMarker.getPosition().lng(),
        "endLat": endLocMarker.getPosition().lat(),
        "endLong": endLocMarker.getPosition().lng(),
        "startDate": StartDateISO,
        "endDate": EndDateISO,
        "contactsList": contactsListString,
        "participants": this.event.value.participants
      }      
      //CurrentEvent stores the last submitted event's data
      this.request.InsertEvent(eventData).then(() => {
        setTimeout(this.waitToInsertActiveEvent, 1000, this.request, this.alertCtrl, this.navCtrl, this.loadingCtrl, this.storage, this.event.value.name, endDate);
      });
    }
  }

  public set_notifications(endDate: Date, eventName: String) {


    }

  fuckthisstupidwaitshit() { location.reload();}

  waitToInsertActiveEvent(request, alertCtrl, navCtrl, loadingCtrl, storage, eventName, endDate: Date) {
    let loading = loadingCtrl.create({
      content: 'Creating Event...'
    });

    loading.present().then(() => {
      request.RequestActiveEvent().then((data) => {
        let event = data['recordset'][0];
        request.RequestEventContacts(event.EventID).then((contactData) => {
          let contacts = contactData['recordset'];
          storage.get('user').then((user) => {
            let fname = user.FirstName + ' ' + user.LastName[0] + '.';
            request.StartWatchTest(event.EventID, event.EndDate, contacts, fname).then(() => {
              //let date = new Date(endDate.getTime() - 18000 * 1000);
              let date = new Date(endDate.setHours(endDate.getHours() + 7));
              //set a 5 minute reminder
              LocalNotifications.schedule({
                title: `${eventName}`,
                text: `${endDate}`,
                at: new Date(date.getTime() - 300 * 1000)
              });
              loading.dismiss();
            }).catch(() => {
              location.reload();
            })
          });
        });
      }).catch(() => {
        request.RequestActiveEvent().then((data2) => {
          let event = data2['recordset'][0];
          request.RequestEventContacts(event.EventID).then((contactData) => {
            let contacts = contactData['recordset'];
            storage.get('user').then((user) => {
              let fname = user.FirstName + ' ' + user.LastName[0] + '.';
              request.StartWatchTest(event.EventID, event.EndDate, contacts, fname).then(() => {
                //let date = new Date(endDate.getTime() - 18000 * 1000);
                let date = new Date(endDate.setHours(endDate.getHours() + 7));
                //set a 5 minute reminder
                LocalNotifications.schedule({
                  title: `${eventName}`,
                  text: `${endDate}`,
                  at: new Date(date.getTime() - 300 * 1000)
                });
                loading.dismiss();
              }).catch(() => {
                location.reload();
              })
            });
          });
        });
      });
    });
  }

  SetupWatch(loading, event, request, alertCtrl, navCtrl, loadingCtrl, storage, eventName, endDate: Date) {
   
  }

  selectSearchResult(item) {
    this.autocompleteItems = [];

    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        if (isStartLocation) {
          if (startLocMarker != null) {
            startLocMarker.setMap(null);
          }
          startLocMarker = new google.maps.Marker({ position: results[0].geometry.location, map: AddEventMap, label: "S" });
        }
        else {
          if (endLocMarker != null) {
            endLocMarker.setMap(null);
          }
          endLocMarker = new google.maps.Marker({ position: results[0].geometry.location, map: AddEventMap, label: "E" });
        }


        AddEventMap.setCenter(results[0].geometry.location);
      }
    })

  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  initMap() {
    this.storage.get('EditEvent').then((edit) => {
      if (edit == true) {
        this.storage.get('activeEvent').then((data) => {
          let event: Event = data;
          this.loadMap(event.EventStartLatLng.lat, event.EventStartLatLng.lng, true);
        });
      }
      else {
        //Init Google Maps API objects

        this.geo.getCurrentPosition().then((position) => {
          currentLat = position.coords.latitude;
          currentLng = position.coords.longitude;
        }).catch((error) => {
          currentLat = 42.2587;
          currentLng = -121.7836;
          let alert = this.alertCtrl.create({
            title: "Attention", subTitle: `We can't access your location`, buttons: ["Ok"]
          });
          alert.present();
        }).then(() => { this.loadMap(currentLat, currentLng, false); });
      }
    })
  }

  loadMap(lat, lng, isEdit) {
    let element = this.AddEventMapEl.nativeElement;
    AddEventMap = new google.maps.Map(element, {
      zoom: 13,
      center: { lat: lat, lng: lng },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
 
    if (isEdit == true) {
      this.storage.get('activeEvent').then((data) => {
        let event: Event = data;
        startLocMarker = new google.maps.Marker({ position: event.EventStartLatLng, map: AddEventMap, label: 'S' });
        startLocMarker.setMap(AddEventMap);
        endLocMarker = new google.maps.Marker({ position: event.EventEndLatLng, map: AddEventMap, label: 'E' });
        endLocMarker.setMap(endLocMarker);
      })
    }
    else {
      startLocMarker = new google.maps.Marker({ position: new LatLng(lat, lng), map: AddEventMap, label: 'S' });
    }

    /* Listeners */
    AddEventMap.addListener('click', function (event) {
      if (isStartLocation == true) {
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

  search() {
    var search = {
      bounds: AddEventMap.getBounds(),
      types: ['lodging']
    };
  }

  togglePosition() {
    if (isStartLocation == true) {
      isStartLocation = false;
      document.getElementById('togglePosition').textContent = "Toggle Marker: End";
    }
    else {
      isStartLocation = true;
      document.getElementById('togglePosition').textContent = "Toggle Marker: Start";
    }
  }

  addMarker(pos: LatLng, title: string) {
    let markerOptions: MarkerOptions = {
      position: pos,
      title: title
    }
    return AddEventMap.addMarker(markerOptions);
  }

  loadContacts() {
    this.contacts = null;
    let loading = this.loadingCtrl.create({
      content: 'Loading Contacts...'
    });
    loading.present().then(() => {
      this.request.RequestContacts().then((data) => {
        this.isVisible = true;
        this.contacts = data['recordset'];
      });
      loading.dismiss();
    });
  } 



  cancelClick() {
    this.navCtrl.pop({ animate: false });
  }

  addContactClick() {
    this.isVisible = false;
    this.navCtrl.push(addcontactPage, {}, { animate: false });
  }
}
