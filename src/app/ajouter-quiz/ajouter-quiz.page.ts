import { Component, OnInit } from '@angular/core';

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
    spaceBetween:10,
    autoplay:true
  }

  constructor() { }

  ngOnInit() {
  }

}
