import { Injectable } from '@angular/core';
import { hotel } from '../models/hotel.model';
import { user } from '../models/user.model';
import { AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private db: AngularFireDatabase ) { }

  getHotel(id: Number){
    return this.db.list('hotels/'+id).snapshotChanges();
  }

  getHotelByKey(key: any){
    return this.db.list('hotels/'+key).valueChanges();
  }

  addRoom(newRoom){
    this.db.list(`hotels`).push(newRoom);
  }

  addReservation(newReservation){
    this.db.list(`reservations`).push(newReservation);
  }

  getHotels() {
    return this.db.list('hotels').snapshotChanges();
  }

  updateRoom(roomKey, updatedRoom){
    this.db.list(`hotels`).update(`${roomKey}`, updatedRoom);
  }

  addUser(user: user){
    this.db.list(`users`).push(user);
  }

  login(username){
    return this.db.list('users', ref => ref.orderByChild('email').equalTo(username)).valueChanges();
  }

  getReservationsByUser(userid){
    return this.db.list('reservations', ref => ref.orderByChild('userid').equalTo(userid)).valueChanges();
  }
}


