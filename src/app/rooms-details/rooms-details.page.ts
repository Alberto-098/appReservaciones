import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel-service.service';
import { reservation } from '../models/reservation.model';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.page.html',
  styleUrls: ['./rooms-details.page.scss'],
})
export class RoomsDetailsPage implements OnInit {

  @ViewChild('myEndPicker') myEndPicker;

    //Rango de Fechas
    minDate = "";
    startDateSelected: boolean = false;
    startDateDay   = "";
    endDateDay     = "";
    endDateMonth   = "";
    startDateMonth = "";
  
    //Precio de Cantidad x Noche
  
    days: any = 0;
    day1: any = new Date();
    day2: any = new Date();

    id: Number;
    hotel : hotel = {
      id: null,
      capacity: 0,
      description: '',
      image: '',
      isActive: false,
      name: '',
      pricePerNight: 0
    };
  

  constructor(private route: ActivatedRoute,
    public alertController: AlertController,
    private hotelService: HotelService,
    private router: Router) { }

  ngOnInit() {

    this.route.params.pipe(
      mergeMap(params => {
        this.id = params.id;
        return this.hotelService.getHotel(params.id)
      })
    ).subscribe( (hotelSnapshot) =>{
      hotelSnapshot.forEach((properties) => {
        this.hotel[JSON.parse(JSON.stringify(properties.key))] = JSON.parse(JSON.stringify(properties.payload));
      });
    });
  } 
  //Actualizacion de Fechas

  updateMyStartDate($event){
    let newDate = new Date($event);
    newDate.setDate( newDate.getDate() + 1 );
    this.minDate = newDate.toISOString();
    this.startDateSelected = true;

    this.startDateDay = $event.split('-')[1];
    this.startDateMonth = $event.split("-")[2].split("T")[0];
    this.day1 = new Date($event);
    this.myEndPicker.value = this.minDate;
  }

  updateMyEndDate($event) {
    this.endDateDay = $event.split('-')[1];
    this.endDateMonth = $event.split("-")[2].split("T")[0];  
    this.day2 = new Date($event);

    const diffTime = Math.abs(this.day2 - this.day1);
    this.days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  async goToCheckout(){
    let isRoomReserved;
    let startDate = new Date(this.day1);
    startDate.setDate( startDate.getDate() + 1 );
    let endDate = new Date(this.day2);
    endDate.setDate( endDate.getDate() + 1 );

    await this.hotelService.getReservationsByRoom(this.id).pipe(
      take(1)
    ).subscribe( (reservations: reservation[])=>{
      reservations.forEach( reservation =>{
        //check if the reservation overlap this new reservation
        let isReserved = this.isRoomReserved(reservation.startDate, reservation.endDate, startDate.toISOString(), endDate.toISOString())
        if(isReserved){
          isRoomReserved = true;
        }
      });

      if(isRoomReserved){
        this.presentAlert();
      }else{
        this.router.navigate(['/checkout',{
          dates: this.startDateDay + '/' + this.startDateMonth +'-' + this.endDateDay + '/' + this.endDateMonth,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          hotelId: this.id,
          hotelName: this.hotel.name,
          capacity: this.hotel.capacity,
          image: this.hotel.image,
          pricePerNight: this.hotel.pricePerNight,
          total: this.hotel.pricePerNight * this.days,
          nights: this.days
        }]);
      }
    })
  }

  isRoomReserved(reservationStart, reservationEnd, newReservartionStart, newReservationEnd){
    if( reservationStart == newReservartionStart || reservationEnd == newReservationEnd){
      return true;
    }else if( reservationStart < newReservartionStart && reservationEnd > newReservationEnd ){
      return true
    }else if( reservationStart < newReservartionStart && reservationEnd < newReservationEnd && reservationEnd > newReservartionStart ){
      return true
    }else if( reservationStart > newReservartionStart && reservationEnd > newReservationEnd && reservationStart < newReservationEnd ){
      return true
    }else if( reservationStart > newReservartionStart && reservationEnd < newReservationEnd && reservationStart != newReservationEnd ){
      return true
    }else{
      return false;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Room is already reserved for the dates you selected',
      message: 'Try again with other dates',
      buttons: ['OK']
    });

    await alert.present();
  }
}
