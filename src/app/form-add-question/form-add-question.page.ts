import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class FormAddQuestionPage implements OnInit , OnDestroy {

  private subscriptions: Subscription[] = [];

  question = new Questions();

  quizs !: Quiz[]

  quizId !: any;

  quizIdGeter !: any

  quizselect!:any

  // id de quiz qui sera dans le path
  idQuiz: any;

  host!: string;
  questionId!: number;
 
 



  constructor(
    private loadingService: LoadingService,
    private questionService: QuestionService,
    private alertService: AlertService,
    private accountService: AccountService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadingService.isLoading.next(true);
    this.host = this.questionService.host;
    this.idQuiz=this.route.snapshot.params["id"]
    this.getQuiz()
  }

    
  GotoReponse(){
    this.router.navigate(['/add-reponse',this.questionId])
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

          for(let i=0; i < this.quizs.length; i++){
            if(this.quizs[i].id === this.idQuiz){
              this.quizselect = this.quizs[i]
            }
          }

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
          // this.questionId= this.quizs[i].questionsList[this.quizs[i].questionsList.length].id
          console.log(this.questionId)
          console.log(this.quizIdGeter)
        }
        else{
          this.quizIdGeter= this.idQuiz
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
            this.questionId=response.id
            this.loadingService.isLoading.next(false);
            this.alertService.showAlert(
              "Question ajouter !",
              AlertType.SUCCESS
            );
          },
          error => {
            console.log(error);
            // vérifions si le message d'erreur correspond à QuestionExist du Backend
            const errorMsg = error.error;
            // vérifions si le message d'erreur correspond à QuestionExist du Backend
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

  


   // On Desinscrit en parcourant la liste des subscriptions
   ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}
