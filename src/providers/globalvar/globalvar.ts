import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class GlobalvarProvider {
  public Res_Name: string;
  // public iospwa: string = 'no';

  constructor(public http: HttpClient) {
    console.log('Hello GlobalvarProvider Provider');
  }

}
