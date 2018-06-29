import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Trajet } from '../../modele/trajets';
import { Person } from '../../modele/Person';
import { DataHolder } from '../../modele/DataHolder';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the TrajetDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-detail',
  templateUrl: 'trajet-detail.html',
})
export class TrajetDetailPage {

  public traj : Trajet;
  public person : Person;
  public isReserved : bool = true
  public passagersUser : int[] = []
  public isDriver : bool

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public db : AngularFirestore) {
    this.traj = navParams.get('trajet');
    this.person = navParams.get('person');
    this.isDriver = this.traj.isDriver;
    console.log(this.isDriver);
    var that = this;
    DataHolder.read(that.db.collection('/Trajets'), x => {
      if ((x.idTrajet == that.traj.id) && (x.idPassagers.indexOf(DataHolder.idUser) >= 0)){
        that.isReserved = false;
      }
    });
  }

  isDriver(){
    return (DataHolder.loggedIn.trajetAsDriver.indexOf(this.traj) != -1);
  }

  ionViewDidLoad() {
  }

  switch(){
    var that = this;
    var passagers = []
    this.passagersUser = []

    DataHolder.read(this.db.collection("/User"), x => {
      that.passagersUser = x.TrajetsCommePassager
    },'id', '==',DataHolder.idUser)

    DataHolder.read(this.db.collection("/Trajets"),
  x => {
    console.log(that.traj.docId);
    if (x.idDoc == that.traj.docId){
      passagers = x.idPassagers;
      if (that.isReserved === false){
        that.db.collection("/Trajets").doc(that.traj.docId).update({
          idPassagers : passagers.filter(x => x != DataHolder.idUser)
        })
        .then(() => {
          that.db.collection("/User").doc(that.person.docId).update({
            TrajetsCommePassager : that.passagersUser.filter(x => x != that.traj.id)
          })
        .then(() => {
            that.isReserved = true;
            that.traj.removePassenger(that.person);
          })
        })
      }
      else{

        passagers.push(DataHolder.idUser);
        that.passagersUser.push(that.traj.id);
        that.db.collection("/Trajets").doc(that.traj.docId).update({
          idPassagers : passagers
        })
        .then(() => {
          that.db.collection("/User").doc(that.person.docId).update({
            TrajetsCommePassager : that.passagersUser.filter(x => x !== undefined)
          })
        .then(() => {
            that.isReserved = false;
            that.traj.addPassenger(that.person)
            console.log("OK");
          })
        })
      }
    }
  });
  }

}
