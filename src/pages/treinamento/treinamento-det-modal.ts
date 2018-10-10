import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

import { AppModule } from '../../app/app.module';

@Component({
  template:
  `<ion-header>
      <ion-toolbar>
        <ion-title>
          Detalhes do Treinamento
        </ion-title>
        <ion-buttons end>
          <button ion-button (click)="closeModal()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="background: #e8e8e8" padding>
      <div padding style="background: #fff">
        <p style="font-size: 16px"><b>{{treinamento.nome}}</b></p>
        <p><b>Data:</b> {{treinamento.data | date: 'dd/MM/yyyy'}}</p>
        <p><b>Hora:</b> {{treinamento.hora}}</p>
        <p style="line-height: 20px">{{treinamento.descricao}}</p>
      </div>
    </ion-content>`
})
export class TreinamentoDetModal {

  id: any;
  treinamento: any = [];
  private url: string = AppModule.getUrl();

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    private http: Http,
    public loadingCtrl: LoadingController,
  ) {
    this.id = this.params.get('id');

    let loading = this.loadingCtrl.create();
    loading.present();

    var arrAvaliacao = JSON.stringify({
      'id': this.id,
    });

    this.http.post(this.url+'treinamento_detalhe.php', arrAvaliacao).subscribe(res => {
      this.treinamento = res.json();
      loading.dismiss();
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
