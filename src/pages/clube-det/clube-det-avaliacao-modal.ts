import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { AppModule } from '../../app/app.module';

@Component({
  template:
  `<ion-header>
      <ion-toolbar>
        <ion-title>
          Avaliação dos Consumidores
        </ion-title>
        <ion-buttons end>
          <button ion-button (click)="closeModal()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="background: #e8e8e8">
      <div padding>
        <ion-segment [(ngModel)]="avaliar_anuncio">
          <ion-segment-button value="avaliacoes">
            Avaliações
          </ion-segment-button>
          <ion-segment-button value="avaliar">
            Avaliar Anúncio
          </ion-segment-button>
        </ion-segment>
      </div>
      <div [ngSwitch]="avaliar_anuncio">
        <ion-list *ngSwitchCase="'avaliacoes'" padding>
          <div *ngFor="let avaliacao of avaliacoes" padding style="border-bottom: 1px solid #cdcdcd; background: #fff">
            <p *ngIf="!avaliacao.data">Nenhuma avaliação até o momento</p>
            <p style="font-size: 16px !important">{{avaliacao.data | date: 'dd/MM/yyyy'}} - {{avaliacao.nome}}</p>
            <p *ngIf="avaliacao.estrela == 1">
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            </p>
            <p *ngIf="avaliacao.estrela == 2">
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            </p>
            <p *ngIf="avaliacao.estrela == 3">
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            </p>
            <p *ngIf="avaliacao.estrela == 4">
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            </p>
            <p *ngIf="avaliacao.estrela == 5">
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
              <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            </p>
            <p style="color: #666">{{avaliacao.descricao}}</p>
          </div>
        </ion-list>
        <ion-list *ngSwitchCase="'avaliar'" padding>
          <ion-list>
            <ion-item>
              <ion-label floating>Nome <span style="color: #ff0000">*</span></ion-label>
              <ion-input type="text" [(ngModel)]="avaliacao.nome"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label floating>E-mail</ion-label>
              <ion-input type="email" [(ngModel)]="avaliacao.email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label floating>Nota</ion-label>
              <ion-select [(ngModel)]="avaliacao.nota">
                <ion-option [value]="1">1</ion-option>
                <ion-option [value]="2">2</ion-option>
                <ion-option [value]="3">3</ion-option>
                <ion-option [value]="4">4</ion-option>
                <ion-option [value]="5">5</ion-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-label floating>Mensagem <span style="color: #ff0000">*</span></ion-label>
              <ion-textarea [(ngModel)]="avaliacao.mensagem"></ion-textarea>
            </ion-item>
          </ion-list>
          <div>
            <button ion-button block (click)="enviarContato()" color="dark" [disabled]="!isValid()">ENVIAR</button>
          </div>
        </ion-list>
      </div>
    </ion-content>`
})
export class ClubeDetAvaliacaoModal {

  id: any;
  private url: string = AppModule.getUrl();
  avaliacao = {nome: '', email: '', nota: '', mensagem: ''};
  avaliar_anuncio: string = "avaliacoes";
  avaliacoes: any;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    private http: Http,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.id = this.params.get('id');

    let loading = this.loadingCtrl.create();
    loading.present();

    var arrAvaliacao = JSON.stringify({
      'id': this.id,
    });

    this.http.post(this.url+'cliente_avaliacao.php', arrAvaliacao).subscribe(res => {
      this.avaliacoes = res.json();
      loading.dismiss();
    });
  }

  isValid(){
    if(this.avaliacao.nome == '' || this.avaliacao.nota == '' || this.avaliacao.mensagem == ''){
      return false;
    }else{
      return true;
    }
  }

  enviarContato(){

    let loading = this.loadingCtrl.create();
    loading.present();

    var arrContato = JSON.stringify({
      'id': this.id,
      'nome': this.avaliacao.nome,
      'email': this.avaliacao.email,
      'nota': this.avaliacao.nota,
      'mensagem': this.avaliacao.mensagem
    });

    this.http.post(this.url+'avaliacao.php', arrContato).subscribe(res => {
      let show = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: res.json().mensagem,
        buttons: [{
          text: 'Ok',
          handler: data => {
            loading.dismiss();
            this.viewCtrl.dismiss();
          }
        }]
      });
      show.present();
    }, (err) =>{
      let show = this.alertCtrl.create({
        title: 'Alerta',
        subTitle: 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou contate o administrador do sistema.',
        buttons: [{
          text: 'Ok',
          handler: data => {
            loading.dismiss();
          }
         }]
      });
      show.present();
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
