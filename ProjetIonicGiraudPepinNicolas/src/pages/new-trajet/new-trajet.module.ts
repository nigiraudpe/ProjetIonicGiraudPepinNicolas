import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTrajetPage } from './new-trajet';

@NgModule({
  declarations: [
    NewTrajetPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTrajetPage),
  ],
})
export class NewTrajetPageModule {}
