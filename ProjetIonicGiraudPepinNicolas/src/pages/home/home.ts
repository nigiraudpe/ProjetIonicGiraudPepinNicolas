import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DashBoardPage } from '../dash-board/dash-board';
import { DataHolder } from '../../modele/DataHolder';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public passwd : string;
  public log : string;
  public error : string = "";

  constructor( public loadingCtrl : LoadingController,
    public navCtrl : NavController,
    public afAuth : AngularFireAuth) {

  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    var that = this;

    const loadingScreen = this.loadingCtrl.create({
      content : "Connection en cours...",
    });
    loadingScreen.present();

    this.afAuth.auth.signInWithEmailAndPassword(this.log,this.passwd).
    then(function(x){
      DataHolder.emailUser = x.email;
      loadingScreen.dismiss();
      that.navCtrl.push(DashBoardPage);
    }, function(x){
      loadingScreen.dismiss();
      that.error = "Identifiant / mot de passe invalide"
    });
  }
}
