import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  template:
  `<ion-header>
      <ion-toolbar>
        <ion-title>
          Regiões Atendidas
        </ion-title>
        <ion-buttons end>
          <button ion-button (click)="closeModal()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item *ngFor="let cidade of descricao">
        <ion-label><ion-icon name="arrow-forward"></ion-icon> {{cidade.nome}}</ion-label>
      </ion-item>
    </ion-content>`
})
export class ClubeDetCidadeModal {

  descricao: any = [];

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.descricao = this.params.get('descricao');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
