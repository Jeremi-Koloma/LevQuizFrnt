import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { PrizeInfo } from '../_Models/prize-info';
import { QuestAnswer, QuestTest } from '../_Models/quest-test';
import { QuestionService } from '../_Services/question.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {

  

  // Les faux modèls
  curQuesion!: QuestTest;
  prizeInfo !: PrizeInfo
  time: number = 15 // secondes
  timeLeft!: number 
  private intervalID!: any




  constructor(
    private router: Router,
    private questionService : QuestionService,
    private modalctrl : ModalController 
  ) { }



  private loadQuesion(){
    this.curQuesion = this.questionService.nxtQuesion();
    this.prizeInfo = this.questionService.getPrizeInfo()
  }

  ngOnInit() {
    this.timeLeft = environment.timePerQuestion; 
    this.loadQuesion()
    this.intervalID = setInterval(() =>{
      if(--this.timeLeft === 0){
        clearInterval(this.intervalID)
        return;
      }

    }, 1000)

  } 

  // Une méthode pour reponse
  doAnswer(answer: QuestAnswer): void {
    // vérifier si la reponse est correct
    if (answer.isRight) {
      this.timeLeft = environment.timePerQuestion
      this.loadQuesion()
    }
  }



  // start(){
  //   //this.router.navigate(['/', "game"])
  // }

}
