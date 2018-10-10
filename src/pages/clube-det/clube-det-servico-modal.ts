import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  template:
  `<ion-header>
      <ion-toolbar>
        <ion-title>
          Serviços Prestados
        </ion-title>
        <ion-buttons end>
          <button ion-button (click)="closeModal()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <p padding-left padding-right style="line-height: 20px">{{descricao}}</p>
    </ion-content>`
})
export class ClubeDetServicoModal {

  descricao: any;

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
