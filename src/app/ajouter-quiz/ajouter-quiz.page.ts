import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-quiz',
  templateUrl: './ajouter-quiz.page.html',
  styleUrls: ['./ajouter-quiz.page.scss'],
})
export class AjouterQuizPage implements OnInit {

  // Déclarons des variables

  mesSlides = {
    slidesPerView:1,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    loop:true,
    spaceBetween:5,
    autoplay:true
  }

  constructor(private router : Router) { }

  ngOnInit() {
  }


  goToAddQuizForm(){
    this.router.navigate(['form-add-quiz'])
  }

}
