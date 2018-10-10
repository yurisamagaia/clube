import { Injectable } from '@angular/core';

import { Http } from '@angular/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AppData {
  data: any;

  constructor(public http: Http) { }
}
