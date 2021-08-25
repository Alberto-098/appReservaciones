import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel-service.service';


@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.page.html',
  styleUrls: ['./rooms-details.page.scss'],
})
export class RoomsDetailsPage implements OnInit {

    //Rango de Fechas

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
  

  constructor(private route: ActivatedRoute, private hotelService: HotelService) { }

  ngOnInit() {

    this.route.params.pipe(
      mergeMap(params => this.hotelService.getHotel(params.id) )
    ).subscribe( (hotelSnapshot) =>{
      hotelSnapshot.forEach((properties) => {
        this.hotel[JSON.parse(JSON.stringify(properties.key))] = JSON.parse(JSON.stringify(properties.payload));
      });
    });
  } 

  //Actualizacion de Fechas

  updateMyStartDate($event){
    this.startDateDay = $event.split('-')[1];
    this.startDateMonth = $event.split("-")[2].split("T")[0];
    this.day1 = $event.split('T')[0];
    this.day1 = new Date($event);
  }

  updateMyEndDate($event) {
    this.endDateDay = $event.split('-')[1];
    this.endDateMonth = $event.split("-")[2].split("T")[0];  
    this.day2 = new Date($event);
    this.days = Math.floor((this.day2 - this.day1)/(1000*60*60*24))*50;
  }

}
