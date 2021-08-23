import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name: string;
  email: string;
  password: string;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  register(){
    console.log(this.name);
    if( this.name=="" || this.email == "" || this.password == ""){
      console.log('Elementos requeridos faltan');
      this.presentAlert();
    }else{
      //register
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Error on submitting the form',
      message: 'Fill all required fields.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
