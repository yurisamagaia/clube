import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';

@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html'
})
export class ContatoPage {

  private url: string = AppModule.getUrl();
  contato = {nome: '', empresa: '', email: '', telefone: '', mensagem: ''};

  constructor(public navCtrl: NavController, private http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

  }

  enviarContato(){

    let loading = this.loadingCtrl.create({});
    loading.present();

    var arrContato = JSON.stringify({
      'nome': this.contato.nome,
      'empresa': this.contato.empresa,
      'email': this.contato.email,
      'telefone': this.contato.telefone,
      'mensagem': this.contato.mensagem
    });

    this.http.post(this.url+'contato.php', arrContato).subscribe(res => {
      let show = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: res.json().mensagem,
        buttons: [{
          text: 'Ok',
          handler: data => {
            loading.dismiss();
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

  isValid(){
    if(this.contato.nome == '' || this.contato.empresa == '' || this.contato.email == '' || this.contato.telefone == '' || this.contato.mensagem == ''){
      return false;
    }else{
      return true;
    }
  }

}
