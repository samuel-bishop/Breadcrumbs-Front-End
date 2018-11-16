import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { httprequest } from '../../httprequest';

@Component({
  selector: 'page-viewEvent',
  templateUrl: 'viewEvent.html',
  providers: [httprequest]
})

export class viewEventPage {

  eventContacts: any;
  viewedEvent: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public request: httprequest, public storage: Storage) {
  }

  getEventContacts(eventid) {
    this.request.RequestEventContacts(eventid)
      .then(data => {
        this.storage.set('eventContacts', data['recordset']);
        console.log('getEventContacts: ');
        console.log(data['recordset']);
      })
  }

  ionViewWillEnter() {
    //get the stored viewedEvent
    this.storage.get('viewedEvent').then((data) => {
      this.getEventContacts(data.EventID);
      this.storage.get('eventContacts').then((econtacts) => {
        this.eventContacts = econtacts;
      });

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

      //set the values for the elements in viewEvent
      document.getElementById("viewEventTitle").textContent = data.EventName;
      document.getElementById("EventStartDateLabel").textContent = formatTime(data.EventStartDate);
      document.getElementById("EventEndDateLabel").textContent = formatTime(data.EndDate);
      document.getElementById("EventPosLatLabel").textContent = data.PositionLatitude;
      document.getElementById("EventPosLonLabel").textContent = data.PositionLongitude;
      document.getElementById("EventParticipantsLabel").textContent = data.EventParticipants ? data.EventParticipants : '(blank)';
      document.getElementById("EventDescriptionLabel").textContent = data.EventDescription ? data.EventDescription : '(blank)';
      
      //var mapsLink: string = "https://www.google.com/maps/@" + data.PositionLatitude + "," + data.PositionLongitude;
      //(document.getElementById("burl") as HTMLAnchorElement).href = mapsLink;
    });
  }

  ionViewWillLeave() {
  }
}
