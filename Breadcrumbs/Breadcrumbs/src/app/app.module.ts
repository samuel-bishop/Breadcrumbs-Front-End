import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { addeventPage } from '../pages/addevent/addevent';
import { addcontactPage } from '../pages/addcontact/addcontact';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    addeventPage,
    addcontactPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    addeventPage,
    addcontactPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
