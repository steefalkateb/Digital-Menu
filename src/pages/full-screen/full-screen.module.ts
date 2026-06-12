import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullScreenPage } from './full-screen';

@NgModule({
  declarations: [
    FullScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(FullScreenPage),
  ],
})
export class FullScreenPageModule {}
