import { Person } from './Person';

export class Comment {
  public author : Person;
  public text : string;

  constructor(who : Person ,lab : string){
    this.author = who;
    this.text = lab;
  }
}
