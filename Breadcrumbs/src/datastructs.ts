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
  public FormattedStartDate: any;

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


  FormatTime(datetime): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
}

