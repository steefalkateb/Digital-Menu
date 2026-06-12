import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Platform, ToastController, ViewController } from 'ionic-angular';

import { Item_group, menu_group } from './../../services/menu.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalvarProvider } from '../../providers/globalvar/globalvar';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';




@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  showBtn: boolean = false;
  deferredPrompt;

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

  item$: Observable<Item_group[]>;
  menu$: Observable<menu_group[]>;

  array_in_observable = new Array();
  index: number = 0;


  page: any;
  lang: boolean = true;

  loading: any;
  paltform_type: string = 'all';
  value_lang: string = 'AR';

  defaultImage = './assets/imgs/logo.png';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: AngularFirestore, public globalvar: GlobalvarProvider, public http: Http,
    public modlCtrl: ModalController, public loadingCtrl: LoadingController, public platform: Platform,
    public toastCtrl: ToastController, public viewCtrl: ViewController) {
    // let newVariable: any;
    // newVariable = window.navigator;
    // if (newVariable && newVariable.standalone) {
    //   // alert('11111111111');
    // }

    this.get_res_name().then(() => {
      console.log(this.globalvar.Res_Name)

      this.menu$ = this.db.collection<menu_group>(this.globalvar.Res_Name + '_group', ref => ref.orderBy('index')).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const key = a.payload.doc.id;
            return { key, ...data };
          });
        })
      );

      this.menu$.subscribe(result => {
        this.onClick(result[0].name)
        if (this.showBtn == true) {
          this.showToast('إضافة التطبيق إلى الشاشة الرئيسية');
        }
      })
    })


  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      cssClass: 'yourCssClassName',
      duration: 10000,
      showCloseButton: true,
      closeButtonText: 'Ok',
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.add_to_home(event)
    })
    toast.present(toast);

  }

  ionViewWillEnter() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log(e)
      e.preventDefault();

      this.deferredPrompt = e;
      this.showBtn = true;

      console.log(this.showBtn)
    });

    // window.addEventListener('appinstalled', (event) => {
    //   // alert('تم انشاء اختصار');
    // });
    // if (window.matchMedia('(display-mode: standalone)').matches) {
    //   alert('display-mode is standalone');
    // }
  }

  ngOnInit() {
    if (this.deferredPrompt === undefined) {
      this.showBtn = false;
      console.log('false' + this.showBtn)
    }
  }

  add_to_home(e) {
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {

          // alert('User accepted the prompt');
        } else {
          // alert('User dismissed the prompt');
        }
        this.deferredPrompt = null;
      });
  }
  // ////////////////////////////////////////////////////
  presentLoadingCustom() {
    let loading = this.loading.create({
      spinner: 'hide',
      content: `<img src="assets/img/gif.gif" />`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }
  //////////////////////////////////////////////////////

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




  load_items_from_FirstGroup(item: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      //////////////////
      this.item$ = this.db.collection<Item_group>(this.globalvar.Res_Name + '_item',
        ref => ref
          .where("group_name", "==", item)
      ).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const key = a.payload.doc.id;
            return { key, ...data };
          });
        })
      );
      this.item$.subscribe(result => {
        if (result.length > 0) {
          this.array_in_observable = [];
          result.map(data => {
            console.log(data)
            this.array_in_observable.push(data)
            resolve();
          })

          this.array_in_observable.sort(function (a, b) {
            return a.index - b.index;
          });
        }
        else {
          resolve();
        }
      })
      /////////////////
    })
  };

  async onClick(item: any) {
    this.loading = this.loadingCtrl.create({
      // content: 'Please wait...',
      // duration: 2000,
      dismissOnPageChange: false,
      showBackdrop: true,
      enableBackdropDismiss: true,
      spinner: "bubbles"
    })

    this.loading.present();

    await this.load_items_from_FirstGroup(item);
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvv');
    this.loading.dismiss();


  }



  Show_item(ll: string) {
    if (ll == 'ar') this.lang = true;
    else this.lang = false;
    console.log(this.lang)
  }

  open_image(item: any) {
    console.log(item.image);

    const modal = this.modlCtrl.create('FullScreenPage',
      { par_item: this.array_in_observable, lang: item.key }
    );
    modal.present();
  }

}
