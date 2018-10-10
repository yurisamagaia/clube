import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  template:
  `<ion-header>
      <ion-toolbar>
        <ion-title>
          Serviços
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
        <ion-item *ngFor="let servico of servicoId; let i = index">
          <ion-label>{{servico.nome}}</ion-label>
          <ion-checkbox color="dark" checked="{{servico.checked}}" (click)="check(servico.id, i)"></ion-checkbox>
        </ion-item>
      </ion-list>
    </ion-content>`
})
export class ClubeServicoModal {

  servicos: any;
  servicoId: any;
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
    this.storage.get('servicoId').then((val) => {
      this.servicoId = val;
      this.initializeItems();
    });
    this.storage.get('servicoBusca').then((res) => {
      if(res){
        this.arrServico = res;
      }
      loading.dismiss();
    });
  }

  check(id, i){
    if(this.servicoId[i].checked == false){
      this.servicoId[i].checked = true;
      this.arrServico.push(id);
      this.storage.set('servicoBusca', this.arrServico);
    }else{
      this.servicoId[i].checked = false;
      this.arrServico.splice(this.arrServico.indexOf(id),1);
      if(this.arrServico.length == 0){
        this.arrServico = [];
        this.storage.set('servicoBusca', null);
      }else{
        this.storage.set('servicoBusca', this.arrServico);
      }
    }
    this.storage.set('servicoId', this.servicoId);
  }

  initializeItems() {
    this.servicos = this.servicoId;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.servicos = this.servicos.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
