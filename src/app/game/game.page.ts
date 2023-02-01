import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor(private router: Router) { }

  


  ngOnInit() {
    
  }


  // start(){
  //   //this.router.navigate(['/', "game"])
  // }

}
