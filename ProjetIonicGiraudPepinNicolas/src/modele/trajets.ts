import { Comment } from './Comments';

export class Trajet{
    public descriptionVoiture : string;
    public dateDepart : Date;
    public etapes : string[];
    public passagers : Person[] = [];
    public conducteur : Person;
    public numeroTel : string;
    public commentaires : Comment[] = [];

    constructor(dateDepart : Date, etapes : string[], conducteur : Person, descr : string){
      this.descriptionVoiture = descr;
      this.dateDepart = dateDepart;
      this.etapes = etapes;
      this.conducteur = conducteur;
      this.descriptionVoiture = descr;
      if (descr === undefined){
        this.descriptionVoiture = "<Pas de description>";
      }
      this.setDriver(conducteur);
    }

    addComment(who : Person , label : Person){
      this.commentaires.push(new Comment(who, label));
    }

    setTelNum(newNum : string){
      this.numeroTel = newNum;
    }

    addPassenger(newPassenger : Person){
      this.passagers.push(newPassenger);
      newPassenger.trajetAsPassenger.push(this);
    }

    removePassenger(oldPassenger : Person){
      var index : int = this.passagers.indexOf(oldPassenger);
      this.passagers.splice(index,1);
      var index2 : int = oldPassenger.trajetAsPassenger.indexOf(this);
      oldPassenger.trajetAsPassenger.splice(index2,1);
    }

    setDriver(newDriver : Person){
      var index : int = this.conducteur.trajetAsDriver.indexOf(this);
      if (index >= 0){
        this.conducteur.trajetAsDriver.splice(index,1);
      }
      this.conducteur = newDriver;
      this.conducteur.trajetAsDriver.push(this);
    }
}
