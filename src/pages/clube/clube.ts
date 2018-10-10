import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AppModule } from '../../app/app.module';
import { ClubeDetPage } from '../../pages/clube-det/clube-det';
import { ClubeServicoModal } from '../../pages/clube/clube-servico-modal';
import { ClubeCidadeModal } from '../../pages/clube/clube-cidade-modal';
import { ClubeAvaliacaoModal } from '../../pages/clube/clube-avaliacao-modal';

@Component({
  selector: 'page-clube',
  templateUrl: 'clube.html'
})
export class ClubePage {

  cidade: any;
  bairro: any;
  servico: any;
  servicos: any = [];
  orderIcon: any;
  filtros: boolean = false;
  items: any = [];
  private url: string = AppModule.getUrl();

  constructor(
    public navCtrl: NavController,
    private http: Http,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.storage.get('ordem').then((val) => {
      this.busca(val);
      this.orderIcon = val;
    });
  }

  initializeItems() {
    this.servicos = this.items;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.servicos = this.servicos.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  busca(ordem){
    let loading = this.loadingCtrl.create({});
    loading.present();

    this.cidade = this.navParams.get('cidade');
    this.bairro = this.navParams.get('bairro');
    this.servico = this.navParams.get('servico');

    var arrServico = JSON.stringify({
      'cidade': this.cidade,
      'bairro': this.bairro,
      'servico': this.servico,
      'ordem': ordem,
    });

    this.http.post(this.url+'buscar.php', arrServico).subscribe(res => {
      this.items = res.json();
      this.initializeItems();
      loading.dismiss();
    });
  }

  buscarFiltro(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.storage.get('ordem').then((ordem) => {
      this.storage.get('cidadeBusca').then((cidades) => {
        this.storage.get('servicoBusca').then((servicos) => {
          this.storage.get('estrelaId').then((estrelas) => {
            var arrServico = JSON.stringify({
              'cidade': cidades,
              'servico': servicos,
              'avaliacao': estrelas,
              'ordem': ordem,
            });

            this.http.post(this.url+'buscar_filtro.php', arrServico).subscribe(res => {
              this.servicos = res.json();
              loading.dismiss();
            });
          });
        });
      });
    });
  }

  ordem(){
    this.storage.get('ordem').then((val) => {
      this.storage.get('cidadeBusca').then((cidades) => {
        this.storage.get('servicoBusca').then((servicos) => {
          this.storage.get('estrelaId').then((estrelas) => {
            if(cidades || servicos || estrelas){
              if(val == 'ASC'){
                this.orderIcon = 'DESC';
                this.storage.set('ordem', 'DESC');
                this.buscarFiltro();
              }else{
                this.orderIcon = 'ASC';
                this.storage.set('ordem', 'ASC');
                this.buscarFiltro();
              }
            }else{
              if(val == 'ASC'){
                this.orderIcon = 'DESC';
                this.storage.set('ordem', 'DESC');
                this.busca('DESC');
              }else{
                this.orderIcon = 'ASC';
                this.storage.set('ordem', 'ASC');
                this.busca('ASC');
              }
            }
          });
        });
      });
    });
  }

  openService(id){
    this.navCtrl.push(ClubeDetPage, {
      id: id
    });
  }

  maisFiltros(){
    if(this.filtros == true){
      this.filtros = false;
    }else{
      this.filtros = true;
    }
  }

  modalServico() {
    let modal = this.modalCtrl.create(ClubeServicoModal);
    modal.onDidDismiss(() => {
      this.buscarFiltro();
    });
    modal.present();
  }

  modalCidade() {
    let modal = this.modalCtrl.create(ClubeCidadeModal);
    modal.onDidDismiss(data => {
      this.buscarFiltro();
   });
    modal.present();
  }

  modalAvaliacao() {
    let modal = this.modalCtrl.create(ClubeAvaliacaoModal);
    modal.onDidDismiss(data => {
      this.buscarFiltro();
    });
    modal.present();
  }
}
