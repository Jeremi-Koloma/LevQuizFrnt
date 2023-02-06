import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';

import { Quiz } from '../_Models/quiz';
import { QuestionService } from '../_Services/question.service';

import { QuizService } from '../_Services/quiz.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {

  // Déclarons les variables
  private subscriptions: Subscription[] = [];
  // une variable pour recupérer l'id qui sera dans le param
  quizId!: number
  // Instance qe Quiz
  quiz = new Quiz()



  // Une variable pour soctker la liste des questions
  public questionListe: any = [];
  // une variable pour recuperer une question dans la liste de questions 
  public currentQuestion: number = 0;
  // Une variable pour recuperer le nombre de points par question
  public points: number = 0;

  // Une variable pour recuperer le nombre de points par question
   public totalPoints: number = 0;
  // Une variable pour la durée
  counter : any = [];
  // Une variable pour stocker la bonne reponse
  correctAnswer: number = 0;
  // une variable pour stocker les mauvaises reponse
  incorrectAnswer: number = 0;
  // Une variable interval ecouler le compteur
  interval$: any;
  // une variable pour niveau de progresse bar
  progress: string = "0";
  // une variable pour voir si le quiz est fini
  isQuizCompleted: boolean = false;

  i!: number;




  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.getOneQuiz(this.quizId = this.route.snapshot.params["id"])

    // Appelons la fonctions qui nous permette d'avoir la liste des quiz
    this.getAllQuestion()

    // Appelons la fonction pour lancer le conter
    this.startCounter()



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



  getAllQuestion() {
    for (let i = 0; i < this.quiz.questionsList.length; i++) {
      this.i=i;
      this.counter.push(this.quiz.questionsList[i].duree)
      this.questionListe.push(this.quiz.questionsList[i]);
      console.log(this.questionListe)
    }

  }

  // // All Question
  // getAllQuestions() {
  //   this.questionService.getQuestionJson().subscribe(response => {
  //     // Socker la liste de question dans la reponse
  //     this.questionList = response.questions;
  //     console.log(this.questionList);
  //   })
  // }


  // Une fonction pour aller à la question suivante
  nextQuestion() {
    // Incrimenter la question pour aller à la question suivante[1]
    this.currentQuestion++;
  }


  // Une fonction pour retourner à la question précedante
  previousQuestion() {
    // Decrémenter la question pour retourner à la precédante
    this.currentQuestion--;
  }



  // Une fonction pour le click de la  reponse
  answer(currentQuestNumber: number, reponse: any) {
    // vérifions si la liste de question prend fin
    if (currentQuestNumber === this.questionListe.length) {
      // on met fin au quiz
      this.isQuizCompleted = true;
      // on appel la fonction pour stoper le compteur
      this.stopCounter()
    }
    // Vérifions si la reponse est correct
    if (reponse.iscorrect) {
      // si la reponse est correct, on gagne le point
      if(this.i>1){
        console.log(this.i)
        this.totalPoints +=  this.questionListe[this.i-1].points
      }
      // this.points = this.points + 10
      // Si la reponse est correct incremente la bonne reponse
      this.correctAnswer++;
      // Avant d'aller à la question suivante, utilisons setTimeOut pour voir le change de backgound
      setTimeout(() => {
        // En suite on part à la question suivante
        this.currentQuestion++;
        // On appel la fonction pour renitailiser le compteur
        this.resetCounter();
        // on appel la fonction qui donne le niveau de progressbar
        this.getProgressPourcent();

      }, 1000) // 1s avant go to next quest
    }
    else {
      setTimeout(() => {
        // Et on part à la question suivante encore
        this.currentQuestion++;
        // on incremente ses mauvaises reponses
        this.incorrectAnswer++;
        // On appel la fonction pour renitailiser le compteur
        this.resetCounter();
        // on appel la fonction qui donne le niveau de progressbar
        this.getProgressPourcent();

      }, 1000)

      // Si la reponse est incorrecte, on enlève -10 points au points de l'utilisateur
      this.points -= 10;

    }

  }



    // // Une fonction pour le click de la  reponse
    // answer(currentQuestNumber: number, option: any) {
    //   // vérifions si la liste de question prend fin
    //   if (currentQuestNumber === this.questionListe.length) {
    //     // on met fin au quiz
    //     this.isQuizCompleted = true;
    //     // on appel la fonction pour stoper le compteur
    //     this.stopCounter()
    //   }
    //   // Vérifions si la reponse est correct
    //   if (option.correct) {
    //     // si la reponse est correct, on gagne le point
    //     this.points += 10
    //     // this.points = this.points + 10
    //     // Si la reponse est correct incremente la bonne reponse
    //     this.correctAnswer++;
    //     // Avant d'aller à la question suivante, utilisons setTimeOut pour voir le change de backgound
    //     setTimeout(() => {
    //       // En suite on part à la question suivante
    //       this.currentQuestion++;
    //       // On appel la fonction pour renitailiser le compteur
    //       this.resetCounter();
    //       // on appel la fonction qui donne le niveau de progressbar
    //       this.getProgressPourcent();
  
    //     }, 1000) // 1s avant go to next quest
    //   }
    //   else {
    //     setTimeout(() => {
    //       // Et on part à la question suivante encore
    //       this.currentQuestion++;
    //       // on incremente ses mauvaises reponses
    //       this.incorrectAnswer++;
    //       // On appel la fonction pour renitailiser le compteur
    //       this.resetCounter();
    //       // on appel la fonction qui donne le niveau de progressbar
    //       this.getProgressPourcent();
  
    //     }, 1000)
  
    //     // Si la reponse est incorrecte, on enlève -10 points au points de l'utilisateur
    //     this.points -= 10;
  
    //   }
  
    // }



  // Une fonction pour lancer le conter
  startCounter() {
    // cet interval sera interval de type rxjs
    this.interval$ = interval(1000).subscribe(val => {
      // Quand le conter est lancer, on le Décrement
      this.counter[this.i]--;
      // Vérifions si le conter reviens à 0, on passe directement à la question suivante
      if (this.counter[this.i] === 0) {
        // on part à la question suivante
        if(this.currentQuestion < this.questionListe[this.questionListe.length].i -1){
          this.currentQuestion++;
        // on renitailise le conter
        this.counter[this.i] = this.counter[this.i+1];
        }
        
        // On enlève -10 points au points de l'utilisateur
        this.points -= 10;
      }
    });
    // Stoper automatiquement le counter après 10 minutes 
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 6000000);
  }


  // Une fonction pour Arrêter le counter
  stopCounter() {
    this.interval$.unsubscribe()
    this.counter = 0
  }


  // Une fonction pour Renitialiser le counter
  resetCounter() {
    // on appel la fonction qui stop de counter
    this.stopCounter();
    // on affecte à nouveau 60s
    this.counter = 60;
    // on appel notre fonction startCounter pour déclancher le counter
    this.startCounter()
  }


  // Unefonction pour Renitialiser le Quiz en entier
  resetQuiz() {
    // on appel la function qui renitialise le counter
    this.resetCounter();
    // on appel la liste des questions
    this.getAllQuestion();
    // on renitialise le points à 0
    this.points = 0;
    // on met le nombre des question à 0
    this.currentQuestion = 0;
    // on mets le progress bar à 0
    this.progress = "0";
  }



  // Une fonction pour le niveau de pourcentagede progress bar
  getProgressPourcent() {
    this.progress = ((this.currentQuestion / this.questionListe.length) * 100).toString();
    return this.progress;
  }















}












