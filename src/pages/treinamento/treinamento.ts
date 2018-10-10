import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';

import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';

import { TreinamentoDetModal } from '../../pages/treinamento/treinamento-det-modal';

@Component({
  selector: 'page-treinamento',
  templateUrl: 'treinamento.html'
})
export class TreinamentoPage {

  items = [];
  private url: string = AppModule.getUrl();

  constructor(public navCtrl: NavController, private http: Http, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.http.get(this.url+'treinamento.php').map(res => res.json()).subscribe(data => {
      this.items = data;
    });
  }

  treinamentoDet(id){
    let modal = this.modalCtrl.create(TreinamentoDetModal, {id: id});
    modal.present();
  }
}
