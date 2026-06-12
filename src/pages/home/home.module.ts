import { HomePage } from './home';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule ({
    declarations:[HomePage],
    imports:[IonicPageModule.forChild(HomePage),LazyLoadImageModule,]
})
export class HomeModule{
    
}