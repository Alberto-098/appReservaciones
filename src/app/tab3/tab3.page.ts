import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel-service.service';
import { LoginService } from '../services/login-service';
import { reservation } from '../models/reservation.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user;
  reservations : reservation[] = [];

  constructor(private loginService: LoginService, private hotelService: HotelService) {}

  ngOnInit(){
    this.user = this.loginService.getLoggedUser();

    this.hotelService.getReservationsByUser(this.user).subscribe( (reservations: reservation[]) =>{
      this.reservations = reservations;
      reservations.forEach((reservation,index) => {
        reservation.totalOfNights = this.getTotalOfNights(new Date(reservation.endDate) , new Date(reservation.startDate));
        this.addHotelPropertiesToReservation(reservation.hotelid, index);
      });
    });

  }

  async addHotelPropertiesToReservation(hotelkey, index){
    await this.hotelService.getHotelByKey(hotelkey).subscribe( (hotel:any) =>{
      this.reservations[index].image = hotel[3];//3 is where image is stored
      this.reservations[index].hotelName = hotel[5];
      this.reservations[index].pricePerNight = hotel[6];
    });
  }

  getTotalOfNights(date2, date1){
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }

}
