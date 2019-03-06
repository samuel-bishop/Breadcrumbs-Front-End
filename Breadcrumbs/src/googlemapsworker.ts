import { Injectable } from '@angular/core';
import { Location } from "@angular/common";
import { GoogleMap, GoogleMaps, GoogleMapOptions } from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { Platform } from "ionic-angular";

@Injectable()
export class GoogleM {
  Map: GoogleMap;
  CurrentLocation: Geolocation;
  Option: GoogleMapOptions;
  constructor() {
    let currentLocation = new Geolocation();
    currentLocation.getCurrentPosition().then((loc) => {
      this.Option = {
        camera: {
          target: {
            lat: loc.coords.latitude,
            lng: loc.coords.latitude
          },
          zoom: 18,
          tilt: 30
        }
      }
       
    });
  }

  DisplayMap() {
    this.Map = GoogleMaps.create('map', this.Option);
  }

  CloseMap() {

  }

  CreateMap() {

  }

  AddMarker() {

  }
};
