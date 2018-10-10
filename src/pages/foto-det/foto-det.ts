import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';

@Component({
  selector: 'page-foto-det',
  templateUrl: 'foto-det.html'
})
export class FotoDetPage {

  foto: any = [];
  id: any;
  private url: string = AppModule.getUrl();

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({});
    loading.present();

    this.id = navParams.get('id');
    
    var arrFoto = JSON.stringify({
      'id': this.id
    });

    this.http.post(this.url+'foto.php', arrFoto).subscribe(res => {
      this.foto = res.json();
      loading.dismiss();
    });
  }
}
