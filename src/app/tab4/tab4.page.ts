import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  name: string;
  email: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.name = sessionStorage.getItem('name');
    this.email = sessionStorage.getItem('email');
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/welcome']);
  }

}
