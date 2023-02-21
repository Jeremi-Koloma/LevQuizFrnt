import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';

import { Quiz } from '../_Models/quiz';
import { User } from '../_Models/user';
import { AccountService } from '../_Services/account.service';

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
  // recupérons id de user
  userId !: number

  // Instance qe Quiz
  quiz = new Quiz()



  // Une variable pour soctker la liste des questions
  public questionListe: any = [];
  // une variable pour recuperer une question dans la liste de questions 
  public currentQuestion: number = 0;
  // Une variable pour recuperer le nombre de points par question
  public totalPoints: number = 0;
  // Une variable pour la durée
  counter: any = [];
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
  j!: number;

  // un Object d'utilisateur
  user = new User();

  clicked !: any




  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }


  ngOnInit() {
    this.getOneQuiz(this.quizId = this.route.snapshot.params["id"])
    //console.log("quiz id" + this.quizId)

    // Appelons la fonctions qui nous permette d'avoir la liste des quiz
    this.getAllQuestion()

    // Appelons la fonction pour lancer le conter
    this.startCounter()

    // LA Fonction qui retourne l'utilisateur connecter
    this.getUserInfo(this.accountService.loggInUsername);

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

          // console.log(this.quiz)

          // On change maintenant userLoggedIn à true sa connexion
        },
        error => {
          console.log(error);

        }
      ));
  }



  getAllQuestion() {
    //console.log(this.quiz.questionsList.length);
    for (let i = 0; i < this.quiz.questionsList.length; i++) {
      this.i = i;
      this.counter.push(this.quiz.questionsList[i].duree)
      this.questionListe.push(this.quiz.questionsList[i]);
      // console.log(this.questionListe)
    }

    //console.log(this.counter);
  }



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
      // Appelons la fonctions qui permettre de connaître l'utilsateur qui a joué au quiz
      this.getUserPaying();
      // on appel la fonction pour stoper le compteur
      this.stopCounter()
    }
    // Vérifions si la reponse est correct
    if (reponse.iscorrect) {
      // si la reponse est correct, on gagne le point
      this.clicked = true;
      this.totalPoints += this.questionListe[currentQuestNumber - 1].points
      this.correctAnswer++;
      // Avant d'aller à la question suivante, utilisons setTimeOut pour voir le change de backgound
      setTimeout(() => {
        // En suite on part à la question suivante
        this.currentQuestion++;
        // On appel la fonction pour renitailiser le compteur
        this.resetCounter();
        // on appel la fonction qui donne le niveau de progressbar
        this.getProgressPourcent();
        this.clicked = false;

      }, 1000) // 1s avant go to next quest
    }
    else {
      this.clicked = true;
      setTimeout(() => {
        // Et on part à la question suivante encore
        this.currentQuestion++;
        // on incremente ses mauvaises reponses
        this.incorrectAnswer++;
        // On appel la fonction pour renitailiser le compteur
        this.resetCounter();
        // on appel la fonction qui donne le niveau de progressbar
        this.getProgressPourcent();
        this.clicked = false;

      }, 1000)


    }

  }


  // Une fonction pour lancer le conter
  startCounter() {
    // cet interval sera interval de type rxjs
    this.interval$ = interval(1000).subscribe(val => {
      // Quand le conter est lancer, on le Décrement
      this.counter[this.currentQuestion]--;
      this.j = this.currentQuestion
      // Vérifions si le conter reviens à 0, on passe directement à la question suivante
      if (this.counter[this.currentQuestion] === 0) {
        // On part à la questions Suivante
        this.currentQuestion++;
        // on incremente ses mauvaises reponses
        this.incorrectAnswer++;
        if (this.currentQuestion === this.questionListe.length) {
          // on met fin au quiz
          this.isQuizCompleted = true;
          // Appelons la fonctions qui permettre de connaître l'utilsateur qui a joué au quiz
          this.getUserPaying();
          // on appel la fonction pour stoper le compteur
          this.stopCounter()
        }
        else {
          this.counter[this.j] = this.counter[this.currentQuestion];
        }

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
    if (this.currentQuestion != this.questionListe.length) {
      this.counter[this.currentQuestion] = this.counter[this.currentQuestion]
    }

  }


  // Une fonction pour Renitialiser le counter
  resetCounter() {
    // on appel la fonction qui stop de counter
    this.stopCounter();
    // on affecte à nouveau 60s
    // on appel notre fonction startCounter pour déclancher le counter
    this.startCounter()
  }


  // Unefonction pour Renitialiser le Quiz en entier
  resetQuiz() {
    // on appel la function qui renitialise le counter
    this.resetCounter();
    // on appel la liste des questions
    this.getAllQuestion();
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



  // Une fontion qui va retourner le nom de quiz de l'utilisateur
  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
        (response: User) => {
          this.user = response;
          //console.log(this.user);
          // recupérons l'id de user pour connaître qui a jouer
          this.userId = this.user.id;
        },
        error => {
          console.log(error);
        }
      )
    );
  }



  // Une fonction qui va permettre de savoir qui a jouer à quel quiz
  getUserPaying() {
    this.quizService.getUserPalyingQuiz(this.userId, this.quizId).subscribe(
      (data) => {
        const userPalyed = data;
        //console.log(data)
      },
      error => {
        console.log(error);
      }
    )
  }











}












