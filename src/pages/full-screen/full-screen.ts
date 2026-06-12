import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Item, Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Item_group } from '../../services/menu.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalvarProvider } from '../../providers/globalvar/globalvar';


@IonicPage()
@Component({
  selector: 'page-full-screen',
  templateUrl: 'full-screen.html',
})
export class FullScreenPage {
  item$: Observable<Item_group[]>;
  item: Item_group = {
    index: null,
    time_stamp: null,

    Description_AR: null,
    Description_EN: null,
    group_name: null,
    Unit1: null,
    Price1: null,

    Unit2: null,
    Price2: null,

    Unit3: null,
    Price3: null,

    Unit4: null,
    Price4: null,
    Calories: null,
    note: null,
    image: null
  }

  // price: string;
  // price2: string;
  // price3: string;
  // price4: string;

  // Unit: string;
  // Unit2: string;
  // Unit3: string;
  // Unit4: string;

  array_in_observable = new Array();
  Key_Selected: string;

  img_swipe: number = 0;
  paltform_type: string = 'all';

  pr: string = '';

  unit_price: boolean = false;
  unit_price2: boolean = false;
  unit_price3: boolean = false;
  unit_price4: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public db: AngularFirestore, public globalvar: GlobalvarProvider, public platform: Platform) {

    this.array_in_observable = this.navParams.get('par_item');
    this.Key_Selected = this.navParams.get('lang');


    for (let i = 0; i < this.array_in_observable.length; i++) {
      if (this.array_in_observable[i].key == this.Key_Selected) {
        this.img_swipe = i
        this.item = this.array_in_observable[i];

        // this.fill_item()
      }
    }
    if (this.item.Unit1 != null) {
      this.unit_price = true;
      console.log('kkkkkkkkkkkkkkkkkkkkkkkkkk'+this.unit_price)
    }

    if (this.item.Unit2 != null) {
      this.unit_price2 = true
    }

    if (this.item.Unit3 != null) {
      this.unit_price3 = true
    }

    if (this.item.Unit4 != null) {
      this.unit_price4 = true
    }

  }


  fill_item() {

    // this.Unit = this.item.Price1 + ' : ' + this.item.Unit1;
    // console.log(this.item.Price1)

    // this.pr = this.item.Price1


    // if (this.item.Unit2 == null || this.item.Unit2 == '' || this.item.Unit2 == undefined) {
    //   this.Unit2 = "";
    // } else {
    //   this.Unit2 = this.item.Price2 + ' : ' + this.item.Unit2;
    // }

    // if (this.item.Unit3 == null || this.item.Unit3 == '' || this.item.Unit3 == undefined) {
    //   this.Unit3 = "";
    // } else {
    //   this.Unit3 = this.item.Price3 + ' : ' + this.item.Unit3;
    // }

    // if (this.item.Unit4 == null || this.item.Unit4 == '' || this.item.Unit4 == undefined) {
    //   this.Unit4 = "";
    // } else {
    //   this.Unit4 = this.item.Price4 + ' : ' + this.item.Unit4;
    // }
  }
  next() {
    if (this.img_swipe < this.array_in_observable.length - 1) {
      this.img_swipe++;
      this.item = this.array_in_observable[this.img_swipe];
      // this.fill_item()
    }
    else {
      this.img_swipe = 0;
      this.item = this.array_in_observable[this.img_swipe];
      // this.fill_item()
    }
  }

  Back() {
    if (this.img_swipe > 0) {
      this.img_swipe--;
      this.item = this.array_in_observable[this.img_swipe];
      // this.fill_item()
    }

    else {
      this.img_swipe = this.array_in_observable.length - 1
      this.item = this.array_in_observable[this.img_swipe];
      // this.fill_item()
    }

  }

  swipeEvent(e) {
    if (e.direction == '2') {
      this.next()


      console.log('right')
    }
    else if (e.direction == '4') {
      this.Back()
      console.log('left')
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
