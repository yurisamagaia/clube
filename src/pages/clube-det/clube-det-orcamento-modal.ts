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
          Solicite um Orçamento
        </ion-title>
        <ion-buttons end>
          <button ion-button (click)="closeModal()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding style="background: #e8e8e8">
      <ion-list>
        <ion-item>
          <ion-label floating>Nome <span style="color: #ff0000">*</span></ion-label>
          <ion-input type="text" [(ngModel)]="contato.nome"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>Empresa</ion-label>
          <ion-input type="text" [(ngModel)]="contato.empresa"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>E-mail</ion-label>
          <ion-input type="email" [(ngModel)]="contato.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>Telefone <span style="color: #ff0000">*</span></ion-label>
          <ion-input type="tel" [(ngModel)]="contato.telefone"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>Cidade <span style="color: #ff0000">*</span></ion-label>
          <ion-input type="text" [(ngModel)]="contato.cidade"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>Bairro <span style="color: #ff0000">*</span></ion-label>
          <ion-input type="text" [(ngModel)]="contato.bairro"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label floating>Mensagem <span style="color: #ff0000">*</span></ion-label>
          <ion-textarea [(ngModel)]="contato.mensagem"></ion-textarea>
        </ion-item>
      </ion-list>
      <div>
        <button ion-button block (click)="enviarContato()" color="dark" [disabled]="!isValid()">ENVIAR</button>
      </div>
    </ion-content>`
})
export class ClubeDetOrcamentoModal {

  id: any;
  private url: string = AppModule.getUrl();
  contato = {nome: '', empresa: '', email: '', telefone: '', cidade: '', bairro: '', mensagem: ''};

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
  }

  isValid(){
    if(this.contato.nome == '' || this.contato.telefone == '' || this.contato.cidade == '' || this.contato.bairro == '' || this.contato.mensagem == ''){
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
      'nome': this.contato.nome,
      'empresa': this.contato.empresa,
      'email': this.contato.email,
      'cidade': this.contato.cidade,
      'bairro': this.contato.bairro,
      'telefone': this.contato.telefone,
      'mensagem': this.contato.mensagem
    });

    this.http.post(this.url+'orcamento.php', arrContato).subscribe(res => {
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
