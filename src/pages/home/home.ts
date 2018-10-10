import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { AppModule } from '../../app/app.module';

import { ClubePage } from '../clube/clube';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cidades: any = [];
  bairros: any = [];
  servicos: any = [];
  banners: any = [];
  cidade: any;
  bairro: any;
  servico: any;
  private url: string = AppModule.getUrl();

  constructor(
    public navCtrl: NavController,
    private http: Http,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private geolocation: Geolocation
  ) {

    this.storage.remove('cidadeBusca');
    this.storage.remove('cidadeId');
    this.storage.remove('servicoBusca');
    this.storage.remove('servicoId');
    this.storage.remove('estrelaId');

    this.http.get(this.url+'cidade.php').map(res => res.json()).subscribe(cidade => {
        this.cidades = cidade;
        this.storage.set('cidadeId', this.cidades);
    });

    this.http.get(this.url+'servico.php').map(res => res.json()).subscribe(servico => {
        this.servicos = servico;
        this.storage.set('servicoId', this.servicos);
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      var arrServico = JSON.stringify({
        'latitude': resp.coords.latitude,
        'longitude': resp.coords.longitude,
      });

      this.http.post(this.url+'teste.php', arrServico).subscribe(banner => {
        this.banners = banner.json();
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  buscaCidades(servico){
    var arrCidade = JSON.stringify({
      'servico':servico
    });

    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();
    this.http.post(this.url+'cidade.php', arrCidade).subscribe(data =>{
      this.bairros = data.json();
    });
    loading.dismiss();
  }

  buscaBairros(cidade){
    var arrBairro = JSON.stringify({
      'cidade':cidade
    });

    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();
    this.http.post(this.url+'bairro.php', arrBairro).subscribe(data =>{
      this.bairros = data.json();
    });
    loading.dismiss();
  }

  buscaServico(cidade, bairro, servico){
    this.navCtrl.push(ClubePage, {
      cidade: cidade,
      bairro: bairro,
      servico: servico
    });
  }

  isInvalid(){
    if(this.servico || this.cidade){
      return true;
    }else{
      return false;
    }
  }

  clearCidade(){
    this.cidade = null;
    this.bairros = [];
  }

  clearBairro(){
    this.bairro = null;
  }

  clearServico(){
    this.servico = null;
  }
}
