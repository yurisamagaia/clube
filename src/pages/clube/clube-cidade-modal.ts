import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  template:
  `<ion-header>
      <ion-toolbar>
        <ion-title>
          Cidades
        </ion-title>
        <ion-buttons end>
          <button ion-button (click)="closeModal()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
      <!--<ion-searchbar placeholder="Buscar" (ionInput)="getItems($event)"></ion-searchbar>-->
    </ion-header>
    <ion-content>
      <ion-list radio-group>
        <ion-item *ngFor="let cidade of cidadeId; let i = index">
          <ion-label>{{cidade.nome}}</ion-label>
          <ion-checkbox color="dark" checked="{{cidade.checked}}" (click)="check(cidade.id, i)"></ion-checkbox>
        </ion-item>
      </ion-list>
    </ion-content>`
})
export class ClubeCidadeModal {

  cidades: any;
  cidadeId: any;
  cidadeBusca: any;
  items = [];
  arrCidade = [];

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.storage.get('cidadeId').then((val) => {
      this.cidadeId = val;
      this.initializeItems();
    });
    this.storage.get('cidadeBusca').then((res) => {
      if(res){
        this.arrCidade = res;
      }
      loading.dismiss();
    });
  }

  check(id, i){
    if(this.cidadeId[i].checked == false){
      this.cidadeId[i].checked = true;
      this.arrCidade.push(id);
      this.storage.set('cidadeBusca', this.arrCidade);
    }else{
      this.cidadeId[i].checked = false;
      this.arrCidade.splice(this.arrCidade.indexOf(id),1);
      if(this.arrCidade.length == 0){
        this.arrCidade = [];
        this.storage.set('cidadeBusca', null);
      }else{
        this.storage.set('cidadeBusca', this.arrCidade);
      }
    }
    this.storage.set('cidadeId', this.cidadeId);
  }

  initializeItems() {
    this.cidades = this.cidadeId;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.cidades = this.cidades.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
