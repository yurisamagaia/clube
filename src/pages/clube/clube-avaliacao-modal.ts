import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  template:
  `<ion-header>
      <ion-toolbar>
        <ion-title>
          Avaliação
        </ion-title>
        <ion-buttons end>
          <button ion-button (click)="closeModal()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list radio-group [(ngModel)]="estrelaId">
        <ion-item>
          <ion-label>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
          </ion-label>
          <ion-radio value="1" (click)="done()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
          </ion-label>
          <ion-radio value="2" (click)="done()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
          </ion-label>
          <ion-radio value="3" (click)="done()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #999"></ion-icon>
          </ion-label>
          <ion-radio value="4" (click)="done()"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-label>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
            <ion-icon item-end small name="star" style="color: #f4a400"></ion-icon>
          </ion-label>
          <ion-radio value="5" (click)="done()"></ion-radio>
        </ion-item>
        <p padding text-center><button ion-button clear outline (click)="limpar()" color="dark">Limpar</button></p>
      </ion-list>
    </ion-content>`
})
export class ClubeAvaliacaoModal {

  servicos: any;
  estrelaId: any;
  servicoBusca: any;
  items = [];
  arrServico = [];

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.storage.get('estrelaId').then((val) => {
      this.estrelaId = val;
      loading.dismiss();
    });
  }

  limpar(){
    this.estrelaId = null;
    this.storage.remove('estrelaId');
  }

  done(){
    this.storage.set('estrelaId', this.estrelaId);
    this.viewCtrl.dismiss();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
