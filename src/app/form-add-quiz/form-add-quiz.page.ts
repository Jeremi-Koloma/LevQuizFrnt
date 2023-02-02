import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AlertService } from '../_Services/alert.service';
import { AccountService } from '../_Services/account.service';
import { LoadingService } from '../_Services/loading.service';
import { QuizService } from '../_Services/quiz.service';
import { AlertType } from '../_Enum/alert-type';
import { User } from '../_Models/user';
import { Quiz } from '../_Models/quiz';


@Component({
  selector: 'app-form-add-quiz',
  templateUrl: './form-add-quiz.page.html',
  styleUrls: ['./form-add-quiz.page.scss'],
})
export class FormAddQuizPage implements OnInit, OnDestroy {

  // une variable pour la validation de type FormGroup
  quizForm!: FormGroup
  // C'est-à-dire que par defaut le formulaire n'est pas valider
  submitted = false;

  private subscriptions: Subscription[] = [];
  user!: User;
  searchedUser!: User[];
  host!: string;
  userHost!: string;
  quizHost!: string;
  quizPicture!: File;
  username!: any;
  userLoggedIn!: boolean;
  showNavbar!: boolean;
  showSuccessAlert!: boolean;
  photoName!: string;
  progress!: number | undefined;
  newQuizURL!: any;
  clientHost!: string;
  quizFail!: boolean;
  quizId!: number;
  // btn aller question
  isclick=false


  constructor(
    private router: Router,
    private alertService: AlertService,
    private accountService: AccountService,
    private quizService: QuizService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {

    this.loadingService.isLoading.next(true);
    this.host = this.quizService.host;
    this.clientHost = this.quizService.clientHost;
    this.userHost = this.quizService.userHost;
    this.quizHost = this.quizService.quizHost;
    this.showNavbar = true;
    if (this.accountService.isLoggedIn()) {
      this.username = this.accountService.loggInUsername;
      this.getUserInfo(this.username);
      this.loadingService.isLoading.next(false);
    } else {
      this.showNavbar = false;
      this.loadingService.isLoading.next(false);
    }


  }



  /* *********************** USER INFO
    Une fonction pour recuperer les information de l'utilisateur
    Qui va prendre un username en paramètre
  ************************* */
  getUserInfo(username: string): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie le username à méthode getUserInformation dans notre serviceAccount
      this.accountService.getUserInformation(username).subscribe(
        // Quand on trouve une reponse de type User
        (response: User) => {
          // on affecte cet reponse à notre variable user qui represente l'utilisateur
          this.user = response;
          // Recupérer le dernier quiz ajouter
          this.quizId = this.user.quizList[this.user.quizList.length -1].id
          console.log("------------Quiz id------------" + this.quizId)
          // On change maintenant userLoggedIn à true sa connexion
          this.userLoggedIn = true;
          this.showNavbar = false;
        },
        error => {
          console.log(error);
          this.userLoggedIn = false;
        }
      ));
  }



  /* *********************** SEARCH USER
    Une fonction qui sera appélér quand tu click sur le bouton search
    pour rechercher un l'utilisateur
    Qui va prendre un event en paramètre qui correspond à ce que vous tapez
  ************************* */
  onSearchUsers(event: any) {
    console.log(event);
    // on recupère le username dans cet event 
    const username = event;
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie la recherche à méthode searchUsers dans notre serviceAccount
      this.accountService.searchUsers(username).subscribe(
        // quand on a une reponse, ça retourne une liste d'utilisateur avec ce nom
        (response: User[]) => {
          console.log(response);
          // on affecte cette reponse à notre variable searchedUser déclarer
          this.searchedUser = response;
        },
        error => {
          console.log(error);
          return this.searchedUser = [];
        }
      ));
  }



  /* *********************** SEARCH USER PROFIL
    Une fonction qui sera appélér quand tu click sur le profil d'un user lors de search
    pour rechercher un l'utilisateur
    Qui va prendre un event en paramètre qui correspond à ce que vous tapez
  ************************* */
  getSearchUserProfile(username: string): void {
    const element: HTMLElement = document.getElementById(
      'closeSearchModal'
    ) as HTMLElement;
    element.click();
    this.router.navigate(['/profile', username]);
    setTimeout(() => {
      location.reload();
    }, 100);
  }



  /* *********************** onFileSelected
     Une fonction qui sera appélér pour selectionner une image à notre quiz
   ************************* */
  onFileSelected(event: any): void {
    console.log('photo selectionner !');
    this.quizPicture = event.target.files[0];
    this.photoName = this.quizPicture.name;
  }



  /* *********************** AJOUTER UN NOUVEAU QUIZ
    Une fonction qui sera appélér ajouter un nouveau quiz
    Qui va prendre un quiz en paramètre
  ************************* */
  onNewQuiz(quiz: Quiz): void {
    // On mets le chargement en true
    this.loadingService.isLoading.next(true);
    // On l'ajout dans la liste de subscriptions 
    this.subscriptions.push(
      // on appel la méthode save dans notre quizService pour enregistrer le quiz
      this.quizService.save(quiz).subscribe(
        // Quand on a une reponse de type Quiz
        (response: Quiz) => {
          // on affiche la reponse
          console.log(response);
          let id: number = response.id;
          this.savePicture(this.quizPicture);
          this.loadingService.isLoading.next(false);
          this.newQuizURL = `${this.clientHost}/quiz/${id}`;
          this.isclick=true
          this.ngOnInit()

        },
        error => {
          console.log(error);
          // vérifions si le message d'erreur correspond à usernameExist du Backend
          const errorMsg = error.error;
          // vérifions si le message d'erreur correspond à QuizExist du Backend
          if (errorMsg === 'QuizExist') {
            this.alertService.showAlert(
              "Oups ! Cet Quiz existe déjà !",
              AlertType.DANGER
            );
            this.loadingService.isLoading.next(false);
          }
        }
      )
    );
  }



  // Une méthode pour Enregistrer la photo de quiz qui va prendre une image en param 
  savePicture(picture: File): void {
    this.subscriptions.push(
      this.quizService.uploadQuizPicture(picture).subscribe(
        response => {
          if (response.type === HttpEventType.UploadProgress) {
            this.progress = (response.loaded / response.total!) * 100;
          } else {
            console.log(response);
            // On appel la function OnNewQuizSuccess
            this.OnNewQuizSuccess(8);
          }
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  GoToQuestionPage(): void {
    this.router.navigate(['/form-add-question', this.quizId]);
    console.log(this.quizId);
  }

  OnNewQuizSuccess(second: number): void {
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
      this.newQuizURL = null;
    }, second * 1000);
  }



  /* *********************** LOGOUT
  Une fonction qui sera appélér la Déconnexion
************************* */
  logOut(): void {
    this.loadingService.isLoading.next(true);
    // On appel la méthode logout() dans notre accountService qui va supprimer le token dans le client
    this.accountService.logOut();
    // on le redirige vers la page login
    this.router.navigateByUrl('/login');
    this.loadingService.isLoading.next(false);
    this.alertService.showAlert(
      "Vous êtes déconnecté avec succès !",
      AlertType.SUCCESS
    );
  }



  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

}
