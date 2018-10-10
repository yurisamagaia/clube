import { Component } from '@angular/core';
import { NavController, ToastController, Platform, LoadingController, Loading, ActionSheetController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { AppModule } from '../../app/app.module';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-inscricao',
  templateUrl: 'inscricao.html'
})
export class InscricaoPage {

  lastImage: string = null;
  loading: Loading;
  base64Image: string = null;
  filename: any = null;
  private url: string = AppModule.getUrl();

  inscricao = {
    nome: '',
    email: '',
    rg: '',
    cpf: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    celular: '',
    telefone: '',
    servico: '',
    cidades: ''
  };

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private transfer: FileTransfer,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private http: Http,
  ) {

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione uma imagem',
      buttons: [{
        text: 'Escolher da biblioteca',
        handler: () => { this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY); }
      },{
        text: 'Usar a câmera',
        handler: () => { this.takePicture(this.camera.PictureSourceType.CAMERA); }
      },{
        text: 'Cancelar',
        role: 'cancel'
      }]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      sourceType: sourceType,
      correctOrientation: true,
      targetWidth: 500,
		  targetHeight: 500
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    });
  }

  getProfileImageStyle() {
    return 'url(' + this.base64Image + ')';
  }

  createName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  enviarContato(){

    let loading = this.loadingCtrl.create({
      content: 'Enviando os dados...'
    });
    loading.present();

    if(this.base64Image){
      this.filename = this.createName();
    }

    var regData = JSON.stringify({
      'nome':this.inscricao.nome,
      'email':this.inscricao.email,
      'rg':this.inscricao.rg,
      'cpf':this.inscricao.cpf,
      'endereco':this.inscricao.endereco,
      'numero':this.inscricao.numero,
      'bairro':this.inscricao.bairro,
      'celular':this.inscricao.celular,
      'telefone':this.inscricao.telefone,
      'servico':this.inscricao.servico,
      'cidades':this.inscricao.cidades,
      'foto':this.filename
    });

    if(this.base64Image){
        var options: FileUploadOptions = {
        fileKey: "file",
        fileName: this.filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': this.filename}
      };
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.upload(this.base64Image, this.url+'upload.php', options);
    }

    let show = this.alertCtrl.create({
      title:'Confirmar',
      subTitle:'Deseja realmente enviar esses dados?',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.http.post(this.url+'inscricao.php', regData).subscribe(res => {
            if(res.json().return == true){
              let show = this.alertCtrl.create({
                title:'Sucesso!',
                subTitle:'Obrigado '+this.inscricao.nome+', cadastro realizado com sucesso.',
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                      this.navCtrl.setRoot(HomePage);
                  }
                }]
              });
              show.present();
            }else if(res.json().return == false){
              this.alertMessage('Erro',res.json().mensagem);
            }else{
              this.alertMessage('Erro','Cadastro não realizado, verifique sua conexão com a internet ou entre em contato com o adminstrador do sistema');
            }
            loading.dismiss();
          });
        }
      }]
    });
    show.present();
  }

  isValid(){
    if(
      this.inscricao.nome == '' ||
      this.inscricao.email == '' ||
      this.inscricao.rg == '' ||
      this.inscricao.cpf == '' ||
      this.inscricao.endereco == '' ||
      this.inscricao.numero == '' ||
      this.inscricao.bairro == '' ||
      this.inscricao.cidade == '' ||
      this.inscricao.estado == '' ||
      this.inscricao.celular == ''
    ){
      return false;
    }else{
      return true;
    }
  }

  alertMessage(title, text){
    let show = this.alertCtrl.create({
      title:title,
      subTitle: text,
      buttons: [{
          text: 'Ok',
      }]
    });
    show.present();
  }

}
