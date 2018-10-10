import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';

@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html'
})
export class SobrePage {

  sobre: any;
  id_sobre: any;
  fotos: any;
  private url: string = AppModule.getUrl();

  constructor(public navCtrl: NavController, private http: Http) {
    var regSobre = JSON.stringify({
     'categoria': 'sobre',
    });

    this.http.post(this.url+'sobre.php', regSobre).subscribe(res =>{
     this.sobre = res.json().descricao;
     this.id_sobre = res.json().id;

     var regFoto = JSON.stringify({
      'id': this.id_sobre,
     });

     this.http.post(this.url+'sobre_foto.php', regFoto).subscribe(res =>{
       this.fotos = res.json();
     });
    });
  }
}
