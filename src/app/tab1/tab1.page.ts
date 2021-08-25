import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HotelService } from 'src/app/services/hotel-service.service';
import { hotel } from '../models/hotel.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  hotels : hotel[] = [];

  constructor(private menu: MenuController, private hotelService: HotelService) {}
  
  ngOnInit() {
    this.hotelService.getHotels().subscribe( (hotelsSnapshot) =>{
      hotelsSnapshot.forEach((hotel) => {
        let hotelSnapshot = JSON.parse(JSON.stringify(hotel.payload));
        hotelSnapshot.id = hotel.payload.key;
        this.hotels.push(hotelSnapshot);
      });
    });  
    
 }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
