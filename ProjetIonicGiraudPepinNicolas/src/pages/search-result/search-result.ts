import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Trajet } from '../../modele/trajets'
import { TrajetDetailPage } from '../trajet-detail/trajet-detail';
import { DataHolder } from '../../modele/DataHolder';

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  public results : Trajet[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public db : AngularFirestore) {
    this.results = navParams.get('results');
  }

  ionViewDidLoad() {
  }

  accessDetail(traj : Trajet, isDriver : boolean){
    this.navCtrl.push(TrajetDetailPage , { trajet : traj, person : DataHolder.loggedIn}, {animate: true, direction: 'forward'});
  }

}
