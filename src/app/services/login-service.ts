import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  isLogged(){
    if(sessionStorage.getItem('userid')){
      return true;
    }else{
      return false;
    }
  }

  getLoggedUser(){
    return sessionStorage.getItem('userid');
  }
}


