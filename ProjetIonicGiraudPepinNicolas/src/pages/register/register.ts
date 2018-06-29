import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataHolder } from '../../modele/DataHolder';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public prenom : string;
  public nom : string;
  public email : string;
  public pwd : string;
  public newPwd : string;
  public error : string;
  public maxId : int = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public af : AngularFireAuth, public db : AngularFirestore) {
    var that = this;
    DataHolder.read(this.db.collection("/UserTable"), x => {
      if (x.idUser > that.maxId){
        that.maxId = x.idUser;
      }
    });
  }

  ionViewDidLoad() {
  }

  register(){
    var ok = true;
    var that = this;
    DataHolder.read(this.db.collection("/UserTable"), x => {
      if (x.email == this.email){
        ok = false;
        that.error = "Cet email est deja pris";
      }
    });

    if (!this.email.includes('@')){
      that.error = "email invalide";
    }

    if (this.pwd != this.newPwd){
      ok = false;
      this.error = "Les mots de passe ne correspondent pas"
    }

    if (ok){
      that.maxId++;
      this.db.collection("/UserTable").add({
        email : this.email,
        idUser : that.maxId
      });

      this.db.collection("/User").add({
          TrajetsCommeConducteur : [],
          TrajetsCommePassager : [],
          id : that.maxId,
          nom : this.nom,
          prenom : this.prenom
      })

      this.af.auth.createUserWithEmailAndPassword(this.email, this.pwd).then(
        x => this.navCtrl.pop()
      )
    }
  }
}
