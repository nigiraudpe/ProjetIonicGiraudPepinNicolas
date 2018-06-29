import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Trajet } from '../../modele/trajets';
import { Person } from '../../modele/Person';
import { TrajetDetailPage } from '../trajet-detail/trajet-detail';
import { SearchResultPage } from '../search-result/search-result';
import { Observable } from 'rxjs/Observable';
import { DataHolder } from '../../modele/DataHolder';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController } from 'ionic-angular';
import { NewTrajetPage } from '../new-trajet/new-trajet';

/**
 * Generated class for the DashBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dash-board',
  templateUrl: 'dash-board.html',
})
export class DashBoardPage {

  public loggedIn : Person = new Person("Severin","Michau",new Date())
  public cont : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFirestore,
  public load : LoadingController) {

    var that = this;
    let ld = load.create({
      content : "Recuperation des données..."
    });
    ld.present();

    DataHolder.read(this.db.collection("/User"),
    x => {
      var pers = new Person(x.prenom,x.nom,new Date());
      pers.idDoc = x.idDoc;
      DataHolder.UserTable[x.id] = pers;
    });

    DataHolder.read(this.db.collection("/UserTable"),
    x => {
      if (x.email == DataHolder.emailUser){
        DataHolder.idUser = x.idUser;
      }
    })

    setTimeout(() => {
      ld.dismiss();
    }, 3000);
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.fetchTraj()
    }, 3000);
  }

  public fetchTraj(){
    var that = this;

    DataHolder.read(this.db.collection("/User"),
    y => {
      if (y.id == DataHolder.idUser){
        DataHolder.loggedIn = that.loggedIn = new Person(y.prenom,y.nom, new Date())
        that.loggedIn.docId = y.idDoc;
        console.log(DataHolder.loggedIn);
        console.log(DataHolder.idUser);
      }
    });

    //Trajet où l'utilisateur est conducteur
    DataHolder.read(this.db.collection("/Trajets"),
    z => {
      if (DataHolder.idUser == z.idConducteur){
        var traj = new Trajet(z.time || new Date(),z.etapes,DataHolder.loggedIn, "Voiture un peu nulle");
        traj.docId = z.idDoc;
        traj.id = z.idTrajet;
        traj.isDriver = true;
      }
    });

    //Trajet où l'utilisateur est passager
    DataHolder.read(this.db.collection("/Trajets"),
    x => {
      if (x.idPassagers.indexOf(DataHolder.idUser) >= 0){
        var traj = new Trajet(x.time || new Date(),x.etapes,DataHolder.UserTable[x.idConducteur], "Voiture un peu nulle");
        traj.docId = x.idDoc;
        traj.id = x.idTrajet
        traj.isDriver = false;
        traj.addPassenger(that.loggedIn)
      }
    })

    //Recupere les passagers
    this.db.collection("/Trajets")
    .ref
    .get()
    .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
         var data = doc.data()
         if (data.idPassagers.indexOf(DataHolder.idUser.toString()) >= 0){
           var cond = DataHolder.UserTable[data.idConducteur];
           var traj = new Trajet(new Date(),data.etapes, cond, "Voiture un peu nulle");
           traj.id = data.idTrajet;
           traj.docId = doc.id;
           data.idPassagers.forEach(x => traj.addPassenger(DataHolder.UserTable[x]));
         }
      });
    });
  }

  accessDetail(traj : Trajet, isDriver : boolean){
    this.navCtrl.push(TrajetDetailPage , { trajet : traj, person : this.loggedIn}, {animate: true, direction: 'forward'});
  }

  resultSearch(){
    console.log(this.cont);
    if (this.cont == ""){
      return
    }
    var pers : Trajet[] = []
    DataHolder.read(this.db.collection("/Trajets"),x => {
      if (x.etapes[x.etapes.length - 1].includes(this.cont)){
        var newTraj = new Trajet(x.time || new Date(),x.etapes,DataHolder[x.idConducteur] || new Person("x","y",new Date(),"Voiture"));
        newTraj.docId = x.idDoc;
        newTraj.id = x.idTrajet;
        pers.push(newTraj);
      }
    });
    this.navCtrl.push(SearchResultPage, {results : pers}, {animate: true,direction : 'forward'});
  }

  newTraj(){
    this.navCtrl.push(NewTrajetPage, {}, {animate : true, direction : 'forward'});
  }
}
