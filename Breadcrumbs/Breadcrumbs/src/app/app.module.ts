import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { addeventPage } from '../pages/addevent/addevent';
import { addcontactPage } from '../pages/addcontact/addcontact';
import { vieweventsPage } from '../pages/viewevents/viewevents';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    addeventPage,
    addcontactPage,
    vieweventsPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    addeventPage,
    addcontactPage,
    vieweventsPage,
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {}
