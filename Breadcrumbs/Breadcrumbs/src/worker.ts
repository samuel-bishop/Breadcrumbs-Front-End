import { LatLng } from "@ionic-native/google-maps";
import { httprequest } from "./httprequest";
import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';
import { Event } from "./datastructs";

export class BCWorker {
  constructor() {

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

PullActiveEvent(request, storage) {
  request.RequestActiveEvent().then((data) => {
    let event = data['recordset'][0];
    if (event != null) {
      let newEvent = new Event(event.EventID,
        event.EventName,
        event.EventDescription,
        event.EventParticipants,
        this.FormatTime(event.EventCreationDate),
        this.FormatTime(event.EndDate),
        new LatLng(event.StartLat, event.Startlon),
        new LatLng(event.EndLat, event.EndLon),
        true);

      let p1 = new Promise(resolve => {
        storage.set('activeEvent', newEvent).then(() => {
        storage.set('CurrentEventExists', true);
      })
        Promise.all([p1]);
      });
    }
  }).catch(() => { storage.set('CurrentEventExists', false); });
}

  PullInactiveEvents(request, storage) {
    request.RequestInactiveEvents().then((data) => {
    let inactiveEvents = data['recordset'][0];
    let inactiveEventsList = [];
    for (let event of inactiveEvents) {
      let newEvent = new Event
        (event.EventID,
        event.EventName,
        event.EventDescription,
        event.EventParticipants,
        this.FormatTime(event.EventCreationDate),
        this.FormatTime(event.EndDate),
        new LatLng(event.StartLat, event.Startlon),
        new LatLng(event.EndLat, event.EndLon),
        false);
      inactiveEventsList.push(newEvent);
    }
      storage.set('inactiveEvents', inactiveEventsList);
  });
}
}

