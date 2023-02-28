import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashlogo',
  templateUrl: './splashlogo.page.html',
  styleUrls: ['./splashlogo.page.scss'],
})
export class SplashlogoPage implements OnInit {

  constructor( public router: Router) { 

    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 3000);  

  }


  ngOnInit() {
  }

}
