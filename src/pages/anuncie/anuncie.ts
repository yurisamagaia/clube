import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer';
import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';

@Component({
  selector: 'page-anuncie',
  templateUrl: 'anuncie.html'
})
export class AnunciePage {

  anuncie: any = [];
  private url: string = AppModule.getUrl();

  constructor(public navCtrl: NavController, private emailComposer: EmailComposer, private http: Http, public alertCtrl: AlertController) {
    this.http.get(this.url+'anuncie.php').map(res => res.json()).subscribe(data => {
       this.anuncie = data;
   });
  }

  sendEmail(emailSend){
   let email = {
      to: emailSend,
      subject: 'Contato via app',
      body: '(Escreva sua mensagem aqui)',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  whatsApp(num){
    let show = this.alertCtrl.create({
      title:'WhatsApp',
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

}
