import { Injectable } from '@angular/core';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
import { firebaseConfig } from './../app/firebase.credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalvarProvider } from '../providers/globalvar/globalvar';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NotificationsService {

  constructor(public http: HttpClient, public globalvar: GlobalvarProvider,
    public toastCtrl: ToastController) {
    //  this.showToast('khkh','123')
  }
  showToast(msg: string, msg2: string) {
    let toast = this.toastCtrl.create({
      message:msg+ " \n \n "+msg2,
      duration: 15000,
      showCloseButton: true,
      closeButtonText: 'Ok',
      dismissOnPageChange: true,
      cssClass: "Toast_CssClassName_msg",
      position: 'top',
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    })
    toast.present(toast);

  }
  requestPermission(): Promise<void> {


    return new Promise<void>(async (resolve) => {
      if (!Notification) {
        resolve();
        return;
      }
      if (!firebase.messaging.isSupported()) {
        resolve();
        return;
      }
      try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        console.log('requestPermission : ' + this.globalvar.Res_Name)

        const token: string = await messaging.getToken();
        console.log('User notifications token:', token);

        let post_link = "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + this.globalvar.Res_Name
        let body = {}
        let options = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(post_link, body, {
          headers: options.set('Authorization', 'key=AAAAYm71je0:APA91bGBjzUru6Z6TiKzJW_06sPo-LrMvsiy0_e0oi-4TmQQGb9hxkGwtX0onGTqdedk955FOw9RvCWn6l564-UTzSTA0fYacvOI1_fIOYCW1I2pPlnBOwgV3ci37npSS4HQNbbyyQXu'),
        }).subscribe();

        console.log('User notifications token:', token);
      } catch (err) {
        console.log(err)

        // No notifications granted
      }

      resolve();
    });
  }


  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      navigator.serviceWorker.ready.then((registration) => {
        // Don't crash an error if messaging not supported
        if (!firebase.messaging.isSupported()) {
          resolve();
          return;
        }

        const messaging = firebase.messaging();

        // Register the Service Worker
        messaging.useServiceWorker(registration);

        // Initialize your VAPI key
        messaging.usePublicVapidKey(
          firebaseConfig.vapidKey
        );

        // Optional and not covered in the article
        // Listen to messages when your app is in the foreground
        messaging.onMessage((payload) => {
          console.log('opennnnnnnnnnnnnn')
          console.log(payload.notification.title);
          console.log(payload.notification.body);
          this.showToast(' '+payload.notification.title, payload.notification.body);


        });
        // Optional and not covered in the article
        // Handle token refresh
        messaging.onTokenRefresh(() => {
          messaging.getToken().then(
            (refreshedToken: string) => {
              console.log(refreshedToken);
              alert(refreshedToken);

            }).catch((err) => {
              alert(err);
            });
        });

        resolve();
      }, (err) => {
        reject(err);
      });
    });
  }

}
