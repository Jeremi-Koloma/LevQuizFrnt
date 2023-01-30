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
export class FormAddQuizPage implements OnInit,OnDestroy {

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
  username!: string;
  userLoggedIn!: boolean;
  showNavbar!: boolean;
  showSuccessAlert!: boolean;
  photoName!: string;
  progress!: number | undefined;
  newQuizURL!: any;
  clientHost!: string;
  quizFail!: boolean;


  constructor(
     private router: Router,
     private formBulder: FormBuilder,
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
    

    /* ***********************
      validation des formulaire Quiz
    ************************* */
    // Lorsque le component est initialiser, on utilise notre quizForm pour avoir accèss aux Groupe de FormBuilder qui est dans le constructeur;
    this.quizForm = this.formBulder.group({
      // Déclarons les champs ou validations qu'on souhaite avoir
      // Le première validation est required
      // maintenant d'éclarons les variables qui seront binder avec le formulaire avec formControlName puis ngClass dans le html au niveau des input
      titre: ["", Validators.required],
      description: ["", Validators.required],

    });

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
  onSearchUsers(event:any) {
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
  onNewPost(quiz: Quiz): void {
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

          
        },
        error => {
          console.log(error);
          this.quizFail = true;
          this.loadingService.isLoading.next(false);
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
            //this.progress = (response.loaded / response.total) * 100;
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


  OnNewQuizSuccess(second: number): void{
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








  // Boutons qui de validation login
  onSubmitQuiz() {
    // changeons la variable de submitted à true;
    this.submitted = true
    // Vérions si les champs sont invalid
    if (this.quizForm.invalid) {
      return
    }
    else {
      // sinon si tous les champs sont remplis,
      alert("Succes !")
      // affectons le formulaire à notre fonction onNewPost
      this.onNewPost(this.quizForm.value)
      console.log(this.onNewPost)
    }
  }



  goToQuestion() {
    this.router.navigate(['form-add-question'])
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

}
