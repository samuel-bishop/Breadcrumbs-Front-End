import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { addeventPage } from '../pages/addevent/addevent';
import { addcontactPage } from '../pages/addcontact/addcontact';
import { vieweventsPage } from '../pages/viewevents/viewevents';
import { Storage } from '@ionic/storage'
import { viewEventPage } from '../pages/viewEvent/viewEvent';
import { LoginPagePage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/Register/Register';
import { editcontactPage } from '../pages/editcontact/editcontact';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    addeventPage,
    addcontactPage,
    vieweventsPage,
    viewEventPage,
    editcontactPage,
    LoginPagePage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    addeventPage,
    addcontactPage,
    vieweventsPage,
    viewEventPage,
    LoginPagePage,
    RegisterPage,
    editcontactPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
