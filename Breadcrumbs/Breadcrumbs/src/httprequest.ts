import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the httprequest provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

var aws_url = 'http://ec2-34-226-139-163.compute-1.amazonaws.com:4604'


@Injectable()
export class httprequest {

  data: Object;
  constructor(public http: Http) {
    console.log('Hello httprequest Provider');
  }

  RequestContacts(userid) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get(aws_url + '/contacts/'+ userid)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }

  RequestEvents(userid) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get(aws_url + '/events/' + userid)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }

  InsertEvent(userid, eventData) {
    var header = new Headers();
    header.append("Accept", 'application/json');
    header.append('Content-Type', 'application/json')
    const requestOpts = new RequestOptions({ headers: header });
    this.http.post(aws_url + '/newevent', eventData, requestOpts)
      .subscribe(data => {
        console.log(data['_body']);
      }, error => {
        console.log(error);
      });
  }
  
  GetActive(userid) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get(aws_url + '/activeEvent/' + userid)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    })
  }
}

