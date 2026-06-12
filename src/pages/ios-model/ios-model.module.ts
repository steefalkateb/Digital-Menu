import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IosModelPage } from './ios-model';

@NgModule({
  declarations: [
    IosModelPage,
  ],
  imports: [
    IonicPageModule.forChild(IosModelPage),
  ],
})
export class IosModelPageModule {}
