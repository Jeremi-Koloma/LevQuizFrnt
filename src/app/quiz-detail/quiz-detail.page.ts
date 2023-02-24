import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlertService } from '../_Services/alert.service';
import { AccountService } from '../_Services/account.service';
import { QuizService } from '../_Services/quiz.service';
import { LoadingService } from '../_Services/loading.service';
import { AlertType } from '../_Enum/alert-type';
import { User } from '../_Models/user';
import { Quiz } from '../_Models/quiz';
import { Questions } from '../_Models/questions';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.page.html',
  styleUrls: ['./quiz-detail.page.scss'],
})
export class QuizDetailPage implements OnInit,OnDestroy {

  // Déclarons nos variables

    // Déclarons des variables
    mesSlides = {
      slidesPerView: 2,   // NOMBRE DE SLIDE PAR PAGE = 1
      centeredSlider: true,
      //loop: true,
      spaceBetween: 5,
      autoplay: true
    }
  

  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];
  // un Object d'utilisateur
  user = new User();
  // une variable pour la liste des quiz
  quizs: Quiz[] = [];
  host!: string;
  // locations ou stock les images de l'utilisateurs
  userHost!: string;
  quizHost!: string;
  // une variable pour le nom d'utilisateur
  userName!: string;
  // Un object question
  questions: Questions = new Questions();
  // une variable pour la liste des questions
  listQuestions: Array<object> = [];
  // un object quiz
  quiz: Quiz = new Quiz();

  quizId!: any

  // Pour cacher le boutons Assigner quand on a un compte Apprenant
  showbtnAddQuizToStudent!: any;

  btnPlayGame !: any

 

  // Injections des dépendances
  constructor(
    public accountService: AccountService,
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}



  ngOnInit() {
    this.loadingService.isLoading.next(true);
    this.resolveQuiz();
    this.quizId = this.route.snapshot.params["id"]
  }

 
  // Recuperons les informations dans la méthode resolveQuiz()
  // qui va s'assurer d'avoir charger les information de quiz dans la base  avant de les afficher dans app
  resolveQuiz(): void {
    // Ce resolvedQuiz est l'actuel quiz avec ses informations disponible
    const resolvedQuiz: Quiz = this.route.snapshot.data['resolvedQuiz'];
    // vérifions si le quiz existe
    if (resolvedQuiz != null) {
      //console.log(resolvedQuiz);
      // On affecte ce resolvedQuiz à notre variable quiz
      this.quiz = resolvedQuiz;

      this.userHost = this.quizService.userHost;
      this.quizHost = this.quizService.quizHost;
      this.host = this.quizService.host;
      // on appel la méthode qui va retourner les informations de l'utilisateur
      this.getUserInfo(this.accountService.loggInUsername);
      this.loadingService.isLoading.next(false);
    } else {
      this.loadingService.isLoading.next(false);
      this.alertService.showAlert('Accun Quiz trouver !', AlertType.DANGER);
      this.router.navigateByUrl('/home');
    }
  }


  // Une fontion qui va retourner le nom de quiz de l'utilisateur
  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.accountService.getUserInformation(username).subscribe(
        (response: User) => {
          this.user = response;
          //console.log(this.user);

          // Vérifions si l'utilisateur a un Role Formateur, il peut faire des Ajout
          for (let i = 0; i < this.user.userRoles.length; i++) {
            if (this.user.userRoles[i].role.name.includes("FORMATEUR")) {
              this.showbtnAddQuizToStudent = true;
              this.btnPlayGame = false;
            }
            // Sinon si l'utilisateur a un compte Apprenant, on caches les Ajouts
            else {
              this.showbtnAddQuizToStudent = false;
              this.btnPlayGame = true;
            }
          }

        },
        error => {
          console.log(error);
        }
      )
    );
  }



  // une fonction qui va retourner le profil
  getUserProfile(username: string): void {
    this.router.navigate(['/profile', username]);
    //console.log(username);
  }


  GoToGamePage(): void{
    this.router.navigate(['/game', this.quizId]);
    //console.log(this.quizId);
  }

  GoToAssignePage(): void{
    this.router.navigate(['/assigner-apprenant', this.quizId]);
    //console.log(this.quizId);
  }


  // Une fonction pour supprimer un Quiz
  onDelete(quizId: number) {
    this.subscriptions.push(
      this.quizService.delete(quizId).subscribe(
        response => {
          //console.log(response);
          this.alertService.showAlert(
            'Quiz supprimer avec succès !',
            AlertType.SUCCESS
          );
          this.router.navigateByUrl('/home');
        },
        error => {
          console.log(error);
          this.alertService.showAlert(
            'Quiz non supprimé ! veuillez ressayé encore',
            AlertType.DANGER
          );
        }
      )
    );
  }



  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

}
