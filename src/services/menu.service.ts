import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { GlobalvarProvider } from '../providers/globalvar/globalvar';

export interface menu_group {
  key?: string;
  index:number;
  name: string;
  time_stamp: any;
}

export interface Item_group {
  key?: string;
  index:number;
  time_stamp: any;

  Description_AR:string;
  Description_EN:string;
  group_name: any;

  Unit1:any;
  Price1: any;
  Unit2: any;
  Price2: any;
  Unit3: any;
  Price3: any;
  Unit4: any;
  Price4: any;
  Calories:string;

  note:string;
  image: string;

}

@Injectable()
export class MenuService {

  private Group_Collection: AngularFirestoreCollection<menu_group>;
  private Group_Collection_item: AngularFirestoreCollection<Item_group>;


  constructor(public db: AngularFirestore,public globalvar: GlobalvarProvider) {
  }
  Get_Group() {
    this.Group_Collection = this.db.collection<menu_group>( this.globalvar.Res_Name +'_group' , ref => ref.orderBy('index'));
    return this.Group_Collection;
  }

  Add_Group(menu: menu_group) {
    this.Group_Collection = this.db.collection<menu_group>(this.globalvar.Res_Name + '_group');
    return this.Group_Collection.add(menu);
  }

  Update_Group(menu: menu_group, id: string) {
    this.Group_Collection = this.db.collection<menu_group>(this.globalvar.Res_Name + '_group');
    return this.Group_Collection.doc(id).update(menu);
  }

  Delete_Group(id: string) {
    this.Group_Collection = this.db.collection<menu_group>(this.globalvar.Res_Name + '_group');
    return this.Group_Collection.doc(id).delete();
  }

  ///////////////////////////////////////////////////////////////////////////

  Get_Item_Group() {
    this.Group_Collection_item = this.db.collection<Item_group>( this.globalvar.Res_Name +'_item' , ref => ref.orderBy('index'));
    return this.Group_Collection_item;
  }

  Add_Item_Group(item: Item_group) {
    this.Group_Collection_item = this.db.collection<Item_group>(this.globalvar.Res_Name + '_item');
    return this.Group_Collection_item.add(item);
  }

  Update_Item_Group(item: Item_group, id: string) {
    this.Group_Collection_item = this.db.collection<Item_group>(this.globalvar.Res_Name + '_item');
    return this.Group_Collection_item.doc(id).update(item);
  }

  Delete_Item_Group(id: string) {
    this.Group_Collection_item = this.db.collection<Item_group>(this.globalvar.Res_Name + '_item');
    return this.Group_Collection_item.doc(id).delete();
  }
}