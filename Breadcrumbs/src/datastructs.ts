import { LatLng } from "@ionic-native/google-maps";
import { httprequest } from "./httprequest";
import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';


@Injectable()

export class Event {
  public EventID: any;
  public EventName: any;
  public EventDesc: any;
  public EventParticipants: any;
  public EventStartDate: any;
  public EventEndDate: any;
  public EventStartLatLng: LatLng;
  public EventEndLatLng: LatLng;
  public EventContacts: any;
  public IsFavorite: boolean;
  public IsActive: boolean;

  constructor(id, name, desc, part, startdate, enddate, startlatlng, endlatlng, isActive) {
    this.EventID = id;
    this.EventName = name;
    this.EventDesc = desc;
    this.EventParticipants = part;
    this.EventStartDate = startdate;
    this.EventEndDate = enddate;
    this.EventStartLatLng = startlatlng;
    this.EventEndLatLng = endlatlng;
    this.IsActive = isActive;
  }
}


