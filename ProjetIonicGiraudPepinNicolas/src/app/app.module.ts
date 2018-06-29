import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashBoardPage } from '../pages/dash-board/dash-board';
import { TrajetDetailPage } from '../pages/trajet-detail/trajet-detail';
import { SearchResultPage } from '../pages/search-result/search-result';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { RegisterPage } from '../pages/register/register';
import { NewTrajetPage } from '../pages/new-trajet/new-trajet';
import { DatePicker } from '@ionic-native/date-picker';

export const config = {
    apiKey: "AIzaSyCpVPuYg4D5ghmrjo9-f_QG-KH1BaAwHF0",
    authDomain: "projettest-f650c.firebaseapp.com",
    databaseURL: "https://projettest-f650c.firebaseio.com",
    projectId: "projettest-f650c",
    storageBucket: "projettest-f650c.appspot.com",
    messagingSenderId: "19670938146"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashBoardPage,
    TrajetDetailPage,
    SearchResultPage,
    RegisterPage,
    NewTrajetPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashBoardPage,
    TrajetDetailPage,
    SearchResultPage,
    RegisterPage,
    NewTrajetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    DatePicker
  ]
})
export class AppModule {}
