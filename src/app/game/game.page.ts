import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Questions } from '../_Models/questions';

import { Quiz } from '../_Models/quiz';
import { Reponses } from '../_Models/reponses';

import { QuizService } from '../_Services/quiz.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {

  // Déclarons les variables
  private subscriptions: Subscription[] = [];
  // Instance qe Quiz
  quiz = new Quiz()
  // une variable pour recupérer l'id qui sera dans le param
  quizId!: number

  question:[] = []

  unereponse = new Reponses()

  // Liste de question
  questionArray !: any

  // Liste de reponse
  reponseArray !:any

  // correctAnswer
  correctAnswer !: boolean




  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.getOneQuiz(this.quizId = this.route.snapshot.params["id"])
    console.log(this.quiz)

    this.questionArray = this.quiz.questionsList
    console.log(this.questionArray)

    





    // this.reponseArray = this.quiz.questionsList[this.question.length].responseList
    // console.log(this.reponseArray)

   
  }



  
  /* *********************** 
    RECUPERER UN SEUL QUIZ
  ************************* */
  getOneQuiz(quId: number): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie le username à méthode getUserInformation dans notre serviceAccount

      this.quizService.getOneQuizById(quId).subscribe(
        // Quand on trouve une reponse de type User
        (response: Quiz) => {
          // on affecte cet reponse à notre variable user qui represente l'utilisateur
          this.quiz = response;
          // Recupérer le dernier quiz ajouter
          console.log(this.quiz)
          // On change maintenant userLoggedIn à true sa connexion
        },
        error => {
          console.log(error);

        }
      ));
  }









}
