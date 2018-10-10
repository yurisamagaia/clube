import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';

import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';
import { AppAvailability } from '@ionic-native/app-availability';

import { ClubeDetServicoModal } from '../../pages/clube-det/clube-det-servico-modal';
import { ClubeDetCidadeModal } from '../../pages/clube-det/clube-det-cidade-modal';
import { ClubeDetOrcamentoModal } from '../../pages/clube-det/clube-det-orcamento-modal';
import { ClubeDetAvaliacaoModal } from '../../pages/clube-det/clube-det-avaliacao-modal';

@Component({
  selector: 'page-clube-det',
  templateUrl: 'clube-det.html'
})
export class ClubeDetPage {

  id: any;
  servico: any = [];
  scheme : any;
  private url: string = AppModule.getUrl();

  constructor(
    public navCtrl: NavController,
    private http: Http,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private appAvailability: AppAvailability,
    private platform: Platform
  ) {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.id = navParams.get('id');
    var arrServico = JSON.stringify({
      'id': this.id,
    });

    this.http.post(this.url+'buscar_detalhe.php', arrServico).subscribe(res => {
      this.servico = res.json();
      loading.dismiss();
    });
  }

/*
  isIOS(){
    if(this.platform.is('ios')){
      return true;
    } else {
      return false;
    }
  }
  isAndroid(){
    if(this.platform.is('android')){
      return true;
    } else {
      return false;
    }
  }

  findScheme(){
    if(this.isIOS()){
      this.scheme = 'twitter://';
      return this.scheme;
    } else if (this.isAndroid()){
      this.scheme = 'com.twitter.android';
      return this.scheme;
    }
  }

  openFacebook(){
    this.appAvailability.check(this.findScheme()).then((isApp) => {
      if(isApp){
        window.open('twitter://user?screen_name=alinscorobete', '_system', 'location=no');
       } else {
        window.open('https://twitter.com/alinscorobete', '_system', 'location=no');
       }
    });
  }*/

  facebook(user){

    let app;

    if (this.platform.is('ios')) {
      app = 'fb://';
    } else if (this.platform.is('android')) {
      app = 'com.facebook.katana';
    }

    this.appAvailability.check(app).then((isApp) => {
      if(isApp){
        window.open('fb://profile?id=yuri.samagaia', '_system', 'location=no');
      }else{
        window.open('https://facebook.com/yuri.samagaia', '_system', 'location=no');
      }
    });
  }


  whatsApp(num){
    let show = this.alertCtrl.create({
      title:'What`s App',
      subTitle:num,
      buttons: [{
        text: 'Cancelar'
      },{
        text: 'Mensagem',
        handler: () => {
          window.open('whatsapp://send?&phone=+55'+num+'&abid=+55'+num, '_system', 'location=no');
        }
      }]
    });
    show.present();
  }

  openFacebook(user){
    window.open('fb://facewebmodal/f?href=https://www.facebook.com/'+user, '_system', 'location=no');
  }

  instagram(user){
    window.open('instagram://user?username='+user, '_system', 'location=no');
  }

  twitter(user){
    window.open('twitter://user?screen_name='+user, '_system', 'location=no');
  }

  modalServico(descricao) {
    let modal = this.modalCtrl.create(ClubeDetServicoModal, {descricao: descricao});
    modal.present();
  }

  modalCidade(descricao) {
    let modal = this.modalCtrl.create(ClubeDetCidadeModal, {descricao: descricao});
    modal.present();
  }

  modalOrcamento(email) {
    let modal = this.modalCtrl.create(ClubeDetOrcamentoModal, {id: email});
    modal.present();
  }

  modalAvaliacao(id) {
    let modal = this.modalCtrl.create(ClubeDetAvaliacaoModal, {id: id});
    modal.present();
  }
}
