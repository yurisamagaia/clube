import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SobrePage } from '../pages/sobre/sobre';
import { AnunciePage } from '../pages/anuncie/anuncie';
import { FotoPage } from '../pages/foto/foto';
import { TreinamentoPage } from '../pages/treinamento/treinamento';
import { TreinamentoDetModal } from '../pages/treinamento/treinamento-det-modal';
import { ContatoPage } from '../pages/contato/contato';
import { InscricaoPage } from '../pages/inscricao/inscricao';
import { FotoDetPage } from '../pages/foto-det/foto-det';
import { ClubeDetPage } from '../pages/clube-det/clube-det';
import { ClubeDetServicoModal } from '../pages/clube-det/clube-det-servico-modal';
import { ClubeDetCidadeModal } from '../pages/clube-det/clube-det-cidade-modal';
import { ClubeDetOrcamentoModal } from '../pages/clube-det/clube-det-orcamento-modal';
import { ClubeDetAvaliacaoModal } from '../pages/clube-det/clube-det-avaliacao-modal';
import { ClubePage } from '../pages/clube/clube';
import { ClubeServicoModal } from '../pages/clube/clube-servico-modal';
import { ClubeCidadeModal } from '../pages/clube/clube-cidade-modal';
import { ClubeAvaliacaoModal } from '../pages/clube/clube-avaliacao-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TextMaskModule } from 'angular2-text-mask';
import { EmailComposer } from '@ionic-native/email-composer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { Geolocation } from '@ionic-native/geolocation';

import { AppData } from '../providers/app-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SobrePage,
    AnunciePage,
    FotoPage,
    TreinamentoPage,
    TreinamentoDetModal,
    ContatoPage,
    InscricaoPage,
    FotoDetPage,
    ClubeDetPage,
    ClubeDetServicoModal,
    ClubeDetCidadeModal,
    ClubeDetOrcamentoModal,
    ClubeDetAvaliacaoModal,
    ClubePage,
    ClubeServicoModal,
    ClubeCidadeModal,
    ClubeAvaliacaoModal
  ],
  imports: [
    BrowserModule,
    TextMaskModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SobrePage,
    AnunciePage,
    FotoPage,
    TreinamentoPage,
    TreinamentoDetModal,
    ContatoPage,
    InscricaoPage,
    FotoDetPage,
    ClubeDetPage,
    ClubeDetServicoModal,
    ClubeDetCidadeModal,
    ClubeDetOrcamentoModal,
    ClubeDetAvaliacaoModal,
    ClubePage,
    ClubeServicoModal,
    ClubeCidadeModal,
    ClubeAvaliacaoModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    FileTransfer,
    Camera,
    AppData,
    InAppBrowser,
    AppAvailability,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

  private static url: string = "http://www.clubedemaodeobra.com.br/api/";

  static getUrl(){
    return this.url;
  }

}
