import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class mapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  location: any;
  constructor(public navCtrl: NavController) {
    
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    let pos = {
      lat: -34.397,
      lng: 150.644
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: pos.lat, lng: pos.lng }
    });
  }
}
