import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { firebaseConfig } from './firebase.credentials';
import { firebase } from '@firebase/app';
import { GlobalvarProvider } from '../providers/globalvar/globalvar';
import { Http } from '@angular/http';
import { NotificationsService } from '../services/notifications';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: string;
  constructor(public platform: Platform, public storage: Storage,
     public globalvar: GlobalvarProvider, public NotificationsService: NotificationsService,
     public http: Http) {
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
    this.handleSplashScreen()
    // platform.registerBackButtonAction(() => { 
    // }); 

    // document.addEventListener("backbutton",function(e) {
    //   console.log("disable back button")
    // }, false);


    if (this.platform.is('ios')) {

      this.storage.get('ios-pwa').then(val => {
        if (val != 'yes') {
          this.rootPage = 'IosModelPage'

        } else {
          this.rootPage = 'HomePage'
        }
      })

    } else {
      this.rootPage = 'HomePage'

    }
  }
  async ngOnInit() {
    firebase.initializeApp(firebaseConfig);
    await this.NotificationsService.init();
  }

  get_res_name(): Promise<void> {
    return new Promise<void>(resolve => {
      //////////////////
      this.http.get('branch.json').subscribe(data => {
        this.globalvar.Res_Name = data["_body"];
        resolve()
      })
      /////////////////
    })
  };


  ngAfterViewInit() {
    this.platform.ready().then(async () => {
      await this.get_res_name()
      await this.NotificationsService.requestPermission();
    });
  }
  ionViewDidEnter() {

  }
  async handleSplashScreen(): Promise<void> {
    try {
      // wait for App to finish loading
      await this.platform.ready()
    } catch (error) {
      console.error('Platform initialization bug')
    }

    const splash = document.getElementById('splash-screen')
    splash.style.opacity = '0'
    setTimeout(() => { splash.remove() }, 900)

  }

  
}

