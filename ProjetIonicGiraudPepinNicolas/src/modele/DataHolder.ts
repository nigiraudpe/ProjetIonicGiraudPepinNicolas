import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Person } from './Person'

export class DataHolder {
  public static emailUser : string;
  public static idUser : int = 0;
  public static loggedIn : Person;
  public static driver : Person;
  public static UserTable : any = {}

  public static read(collection : AngularFirestoreCollection,callback : any,
     condition1 : string, condition2 : string , condition3 : any){
       var reference = collection.ref;
       var ListObject : any[] = []
       if (condition1 !== undefined && condition2 !== undefined && condition3
       !== undefined){
         reference = reference.where(condition1,condition2,condition3);
       }
       reference = reference.get()
       reference.then(function(all){
         all.forEach(function(doc){
           var embeddedData = doc.data();
           embeddedData.idDoc = doc.id;
           callback(embeddedData);
         })
       })
     }
  public static getUser(collection : AngularFirestoreCollection , identifiant : int, refObj : any){
    DataHolder.read(collection,
    x => {
      refObj.data = new Person(x.prenom, x.nom , new Date());
    },'id','==',identifiant);
  }
}
