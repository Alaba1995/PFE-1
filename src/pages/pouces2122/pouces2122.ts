import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import {DomSanitizer} from '@angular/platform-browser';
/**
 * Generated class for the Pouces2122Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pouces2122',
  templateUrl: 'pouces2122.html',
})
export class Pouces2122Page {

  rem: firebase.database.Reference;
  items : Observable<any>;
  favs : AngularFireList<any>;

  constructor(public toastCtrl: ToastController ,public sanitizer : DomSanitizer   , public navCtrl: NavController,afdb : AngularFireDatabase ,public navParams: NavParams) {
    this.items = afdb.list('Products/pouces2122/').valueChanges();
    if(firebase.auth().currentUser!=null){
      
      this.rem = firebase.database().ref('Favourites/'+firebase.auth().currentUser.uid );
     }
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  AddToFavourites(item){
    console.log(firebase.auth().currentUser);

    if (firebase.auth().currentUser!=null){
      
      let ref = this.rem.push({});
      ref.set({
        Model : item.Model,
        Image : item.Image,
        Price : item.Prix,
        key : ref.key,
      });
      
        let toast = this.toastCtrl.create({
          message: 'Le produit a été ajouté ',
          duration: 1200
        });
        toast.present();
    }
    
      else{
        let toast = this.toastCtrl.create({
          message: 'Please Log in first !',
          duration: 1200
        });
        toast.present();
      }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pouces2122Page');
  }

}
