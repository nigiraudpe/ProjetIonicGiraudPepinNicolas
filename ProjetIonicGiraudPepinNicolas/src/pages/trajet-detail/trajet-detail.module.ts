import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrajetDetailPage } from './trajet-detail';

@NgModule({
  declarations: [
    TrajetDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TrajetDetailPage),
  ],
})
export class TrajetDetailPageModule {}
