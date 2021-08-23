import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.page.html',
  styleUrls: ['./search-details.page.scss'],
})
export class SearchDetailsPage implements OnInit {

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
    // this.day1 = parseFloat($event);
    this.day1 = new Date($event);
  }

  updateMyEndDate($event) {
    this.endDateDay = $event.split('-')[1];
    this.endDateMonth = $event.split("-")[2].split("T")[0];  
    //this.day2 = parseFloat($event);
    //this.days = this.day2; //< - this.day1;
    this.day2 = new Date($event);
    this.days = Math.floor((this.day2 - this.day1)/(1000*60*60*24))*50;
    // this.days.setDate (this.days.getDate()+1);
  }

}
