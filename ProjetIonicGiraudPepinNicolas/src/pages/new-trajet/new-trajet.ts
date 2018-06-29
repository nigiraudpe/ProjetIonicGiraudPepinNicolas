import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataHolder } from '../../modele/DataHolder';

/**
 * Generated class for the NewTrajetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-trajet',
  templateUrl: 'new-trajet.html',
})
export class NewTrajetPage {

  public now : Date = new Date().toISOString();
  public chosenDate : Date;
  public etp1 : string;
  public etp2 : string;
  public etp3 : string;
  public etp4 : string;
  public etp5 : string;
  public maxId : int = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public datepicker : DatePicker, public database : AngularFirestore) {
    DataHolder.read(this.database.collection("/Trajets"), x => {
      if (x.idTrajet >= this.maxId){
        this.maxId = x.idTrajet
      }
    });
  }

  register(){
    console.log(this.maxId);
    console.log(DataHolder.idUser);
    console.log([this.etp1,this.etp2,this.etp3,this.etp4,this.etp5].filter(x => x != undefined))
    this.database.collection("/Trajets").add({
      etapes : [this.etp1,this.etp2,this.etp3,this.etp4,this.etp5].filter(x => x != undefined),
      idConducteur : DataHolder.idUser,
      idPassagers : [],
      idTrajet : ++this.maxId,
      time : this.chosenDate
    })
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

  }

}
