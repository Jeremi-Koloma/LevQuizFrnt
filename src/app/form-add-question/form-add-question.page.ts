import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from '../_Enum/alert-type';
import { Questions } from '../_Models/questions';
import { Quiz } from '../_Models/quiz';
import { AccountService } from '../_Services/account.service';
import { AlertService } from '../_Services/alert.service';
import { LoadingService } from '../_Services/loading.service';
import { QuestionService } from '../_Services/question.service';

@Component({
  selector: 'app-form-add-question',
  templateUrl: './form-add-question.page.html',
  styleUrls: ['./form-add-question.page.scss'],
})
export class FormAddQuestionPage implements OnInit {

  private subscriptions: Subscription[] = [];
  question = new Questions();

  quizs !: Quiz[]

  quizId !: any;

  quizIdGeter !: any


  host!: string;
  userHost!: string;
  quizHost!: string;


  userLoggedIn!: boolean;

  clientHost!: string;


  constructor(
    private loadingService: LoadingService,
    private questionService: QuestionService,
    private alertService: AlertService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.loadingService.isLoading.next(true);
    this.host = this.questionService.host;
    this.getQuiz()
  }

  // Une fonctions pour avoir la liste de tout les quiz
  getQuiz(): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on appel la méthode getQuiz dans notre serviceAccount qui va retourné la liste des Quizs
      this.accountService.getQuiz().subscribe(
        // on va avoir une liste de reponse
        (response: Quiz[]) => {
          // on envoie cette liste de reposonse à notre variable quizs déclaré
          this.quizs = response;
          // on affiche la liste des quizs dans la console
          console.log(this.quizs);
          // on stop l'effet de chargement
          this.loadingService.isLoading.next(false);
        },
        error => {
          // s'il ya erreur, on affiche l'erreur dans la console
          console.log(error);
          this.loadingService.isLoading.next(false);
        }
      ));
  }


  /* *********************** AJOUTER UN NOUVEAU QUIZ
     Une fonction qui sera appélér ajouter un nouveau quiz
     Qui va prendre un quiz en paramètre
   ************************* */
  onNewQuestion(): void {

    for (let i = 0; i < this.quizs.length; i++) {
      if (this.quizs[i].titre == this.quizId) {
        this.quizIdGeter = this.quizs[i].id
        console.log(this.quizIdGeter)
      }
    }
    // On mets le chargement en true
    this.loadingService.isLoading.next(true);
    // On l'ajout dans la liste de subscriptions 
    this.subscriptions.push(

      // on appel la méthode save dans notre quizService pour enregistrer le quiz



      this.questionService.save(this.question, this.quizIdGeter).subscribe(
        // Quand on a une reponse de type Quiz
        (response: Questions) => {
          // on affiche la reponse
          console.log(response);
        },
        error => {
          console.log(error);
          // vérifions si le message d'erreur correspond à usernameExist du Backend
          const errorMsg = error.error;
          // vérifions si le message d'erreur correspond à QuizExist du Backend
          if (errorMsg === 'QuestionExist') {
            this.alertService.showAlert(
              "Oups ! Question existe déjà !",
              AlertType.DANGER
            );
            this.loadingService.isLoading.next(false);
          }
        }
      )
    );
  }







  goToResponse() {

  }

}
