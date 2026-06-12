import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-ios-model',
  templateUrl: 'ios-model.html',
})
export class IosModelPage {
  rootPage: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modlCtrl: ModalController, public viewCtrl: ViewController, public storage: Storage) {
  }

  ionViewDidLoad() {


    this.storage.set('ios-pwa', 'yes');

    console.log('ionViewDidLoad IosModelPage');
  }

  openFacebook() {
    window.open("https://www.facebook.com/hawlalbelad/", '_system', 'location=yes');
  }
  inst() {
    window.open("https://www.instagram.com/hawlalbelad/", '_system', 'location=yes');
  }
  mail() {
    window.open("mailto:info@hawlalbelad.com", '_system', 'location=yes');
  }
  skip() {
    // this.viewCtrl.dismiss();
    this.navCtrl.setRoot('HomePage');
    // const modal = this.modlCtrl.create('HomePage'
    // );
    // modal.present();
  }
}
