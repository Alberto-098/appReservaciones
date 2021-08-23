import { Component, OnInit } from '@angular/core';

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
  

  constructor() { }

  ngOnInit() {
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
