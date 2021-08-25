import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { hotel } from '../models/hotel.model';
import { HotelService } from '../services/hotel-service.service';


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

  goToCheckout(){
    let startDate = new Date(this.day1);
    startDate.setDate( startDate.getDate() + 1 );
    let endDate = new Date(this.day2);
    endDate.setDate( endDate.getDate() + 1 );

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
    }])
  }
}
