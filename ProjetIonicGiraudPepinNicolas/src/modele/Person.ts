import { Trajet } from './trajets';

export class Person{
  public nom : string;
  public prenom : string;
  public dateDeNaissance : Date;
  public static currentId : int = 0;
  public trajetAsDriver : Trajet[] = [];
  public trajetAsPassenger : Trajet[] = [];

  constructor(firstNom : string, firstPrenom : string, naissance : Date){
    this.nom = firstNom;
    this.prenom = firstPrenom;
    this.dateDeNaissance = naissance;
  }

  getNbTrajets(){
    return this.trajetAsDriver.length + this.trajetAsPassenger.length;
  }
}
