import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HotelService } from '../services/hotel-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name: string;
  email: string;
  password: string;

  constructor(public alertController: AlertController, private hotelService: HotelService) { }

  ngOnInit() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  register(){
    if( this.name=="" || this.email == "" || this.password == ""){
      this.presentAlert();
    }else{
      this.hotelService.addUser({
        id: Date.now() + "",
        name: this.name,
        email: this.email,
        password: this.password,
        isAdmin: false
      });
      alert('Now  you are able to log in');
      location.href = "/login";  
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
