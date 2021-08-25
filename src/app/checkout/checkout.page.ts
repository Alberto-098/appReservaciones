import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel-service.service';
import { reservation } from '../models/reservation.model';
import { LoginService } from '../services/login-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  dates;
  hotelId;
  hotelName;
  capacity;
  image;
  pricePerNight;
  total;
  nights;
  startDate;
  endDate;

  constructor(private route: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.dates= this.route.snapshot.paramMap.get("dates");
    this.startDate= this.route.snapshot.paramMap.get("startDate");
    this.endDate= this.route.snapshot.paramMap.get("endDate");
    this.hotelName= this.route.snapshot.paramMap.get("hotelName");
    this.hotelId= this.route.snapshot.paramMap.get("hotelId");
    this.capacity= this.route.snapshot.paramMap.get("capacity");
    this.image= this.route.snapshot.paramMap.get("image");
    this.total= this.route.snapshot.paramMap.get("total");
    this.pricePerNight= this.route.snapshot.paramMap.get("pricePerNight");
    this.nights= this.route.snapshot.paramMap.get("nights");
  }

  doReservation(){
    const userid = this.loginService.getLoggedUser();
    
    let reservation: reservation = {
      userid: userid,
      hotelid: this.hotelId,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.hotelService.addReservation(reservation);
    this.router.navigate(['/confirm']);
  }

}
