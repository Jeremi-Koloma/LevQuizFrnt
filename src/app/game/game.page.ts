import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PrizeInfo } from '../_Models/prize-info';
import { QuestAnswer, QuestTest } from '../_Models/quest-test';
import { Questions } from '../_Models/questions';
import { LoadingService } from '../_Services/loading.service';
import { QuestionService } from '../_Services/question.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {

  private subscriptions: Subscription[] = [];
  // une variable pour la liste des listes
  questionList !: Questions[]


  curQuestion!: any
  questionIndex: number = 0



  constructor(
    private router: Router,
    private questionService : QuestionService,
    private loadingService: LoadingService,
  ) { }





  ngOnInit() {

    this.getQuestionList()
  } 


    /* *********************** QUESTIONS LISTE
    Une fonctions pour avoir la liste de toutes les questions
 ************************* */
    getQuestionList(): void {
      // On l'ajout dans la liste de subscriptions
      this.subscriptions.push(
        // on appel la méthode getQuestionList dans notre questionService qui va retourné la liste de Questions
        this.questionService.getQuestionList().subscribe(
          // on va avoir une liste de reponse de Question
          (response: Questions[]) => {
            // on envoie cette liste de reposonse à notre variable questionList déclaré
            this.questionList = response;
            // on affiche la liste des Questions dans la console
            console.log(this.questionList);
          },
          error => {
            // s'il ya erreur, on affiche l'erreur dans la console
            console.log(error);
          }
        ));
    }
  

  





}
