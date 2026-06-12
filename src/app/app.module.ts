import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { MenuService } from '../services/menu.service';
import { GlobalvarProvider } from '../providers/globalvar/globalvar';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './firebase.credentials';
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';


// LazyLoadImage
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';

import { IonicStorageModule } from '@ionic/storage';
import { NotificationsService } from '../services/notifications';

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,

    IonicStorageModule.forRoot(),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuService,
    NotificationsService,
    GlobalvarProvider,
    GlobalvarProvider

  ]
})
export class AppModule { }
