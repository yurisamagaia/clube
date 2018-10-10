import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { SobrePage } from '../pages/sobre/sobre';
import { AnunciePage } from '../pages/anuncie/anuncie';
import { ClubePage } from '../pages/clube/clube';
import { FotoPage } from '../pages/foto/foto';
import { TreinamentoPage } from '../pages/treinamento/treinamento';
import { ContatoPage } from '../pages/contato/contato';
import { InscricaoPage } from '../pages/inscricao/inscricao';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;
  pageInscricao: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Sobre Nós', component: SobrePage, icon: 'help-circle' },
      { title: 'Anuncie', component: AnunciePage, icon: 'megaphone' },
      { title: 'Clube de Mão de Obra', component: ClubePage, icon: 'construct' },
      { title: 'Fotos', component: FotoPage, icon: 'images' },
      { title: 'Agenda de Treinamento', component: TreinamentoPage, icon: 'calendar' },
      { title: 'Fale Conosco', component: ContatoPage, icon: 'mail' },
    ];

    this.pageInscricao = [
      { title: 'Inscreva-se', component: InscricaoPage, icon: 'create' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.set('ordem', 'ASC');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
