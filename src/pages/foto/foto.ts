import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';

import { FotoDetPage } from '../foto-det/foto-det';

@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html'
})
export class FotoPage {

  fotos: any;
  private url: string = AppModule.getUrl();

  constructor(public navCtrl: NavController, private http: Http) {
    this.http.get(this.url+'foto.php').map(res => res.json()).subscribe(data => {
        this.fotos = data;
    });
  }

  openFoto(id){
    this.navCtrl.push(FotoDetPage, {
      id: id
    });
  }

  doRefresh(refresher) {
    this.http.get(this.url+'foto.php').map(res => res.json()).subscribe(data => {
      this.fotos = data;
      refresher.complete();
    });
  }
}
