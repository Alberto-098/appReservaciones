import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login-service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: LoginService, private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the login page
        if (!this.authService.isLogged()) {
            this.router.navigate(['/welcome']);
            return false;
        }
        return true;
    }
}