import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HotelService } from '../services/hotel-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(
    public alertController: AlertController,
    private navCtrl: NavController,
    private hotelService: HotelService
  ) { }

  ngOnInit() {
  }

  login() {
    if(this.username=='' || this.username == undefined || this.password=='' || this.password==undefined){
      this.presentAlert();
      return;
    }
    
    this.hotelService.login(this.username).subscribe( (user)=> {
      let currentUser : any = user[0];
      if(currentUser.password == this.password){
        sessionStorage.setItem('userid', currentUser.id);
        sessionStorage.setItem('name', currentUser.name);
        sessionStorage.setItem('email', currentUser.email);
        this.navCtrl.navigateRoot('/tabs', { animationDirection: 'forward' });
      }else{
        this.presentAlert();
      }
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Login failed',
      message: 'Try again',
      buttons: ['OK']
    });

    await alert.present();
  }

}
