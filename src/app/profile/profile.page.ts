import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
 
import { AccountService } from '../_Services/account.service';
import { QuizService } from '../_Services/quiz.service';
import { LoadingService } from '../_Services/loading.service';
import { AlertService } from '../_Services/alert.service';
import { Quiz } from '../_Models/quiz';
import { User } from '../_Models/user';
import { PasswordChange } from '../_Models/password-change';
import { AlertType } from '../_Enum/alert-type';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  quizId!: number;
  quizs: Quiz = new Quiz();
  user!: User;
  host!: string;
  userHost!: string;
  quizHost!: string;
  username!: any;
  profilePictureChange!: boolean;
  profilePicture!: File;
  userphoto!: string ;



  // une variable pour nos segement
  segId='profil';

  constructor(
    private route: ActivatedRoute,
    public accountService: AccountService,
    private quizService: QuizService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    // Quand le composant est initialiser
    this.loadingService.isLoading.next(true);
    this.username = this.route.snapshot.paramMap.get('username');
    this.host = this.quizService.host;
    this.userHost = this.quizService.userHost;
    this.quizHost = this.quizService.quizHost;
    this.getUserInfo(this.username);
    this.loadingService.isLoading.next(false);
    this.userphoto=this.accountService.userHost;
  }


  // Une fonction pour avoir les l'information de l'utilisateur
  getUserInfo(username: string): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
        // on envoie l'utilisateur à méthode getUserInformation dans notre serviceAccount
      this.accountService.getUserInformation(username).subscribe(
           // on retourne une reponse de type User
        (response: User) => {
          // on affecte cet reponse à notre variable user qui represente l'utilisateur
          this.user = response;
          // on appel la fontions qui retourne la liste de tout les quiz d'un utilisateur
          this.getQuizsByUsername(this.user.username);
        },
        error => {
          console.log(error);
          //this.user = null;
        }
      )
    );
  }


  // une fontion qui va retourner tout les Quiz d'un utilisateur
  getQuizsByUsername(username: string): void {
     // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
       // on envoie l'utilisateur à méthode getQuizByUsername dans notre serviceAccount
      this.quizService.getQuizByUsername(username).subscribe(
        // on retourne une liste de reponses
        (response: Quiz[]) => {
          // affectons cette liste à quizList
          this.user.quizList = response;

          console.log(this.user.quizList);
        },
        error => {
          console.log(error);
          //this.user.quizList = null;
        }
      )
    );
  }



  // Une fonction pour écouter l'utilisateur quand il selectionne un ficher pour changer son profil
  onProfilePictureSelected(event: any): void {
    console.log(event);
    this.profilePicture = event.target.files[0] as File;
    console.log(this.profilePicture);
    this.profilePictureChange = true;
  }


  
  // Une fonction quand utilisateur change ses informations
  onUpdateUser(updatedUser: User): void {
    this.loadingService.isLoading.next(true);
    this.subscriptions.push(
      this.accountService.updateUser(updatedUser).subscribe(
        response => {
          console.log(response);
          // vérifions si le profile a changé
          if (this.profilePictureChange) {
            // on prend le profil actuel de l'utilisateur
            this.accountService.uploadeUserProfilePicture(this.profilePicture);
          }
          this.loadingService.isLoading.next(false);
          this.alertService.showAlert(
            "Profil mis à jour avec succès",
            AlertType.SUCCESS
          );
        },
        error => {
          console.log(error);
          this.loadingService.isLoading.next(false);
          this.alertService.showAlert(
            "La mise à jour du profil a échoué. Veuillez réessayer...",
            AlertType.DANGER
          );
        }
      )
    );
  }



  // une fonction pour changer le mots de passe de l'utilisateur
  onChangePassword(passwordChange: PasswordChange) {
    console.log(passwordChange);
    const element: HTMLElement = document.getElementById(
      'changePasswordDismiss'
    ) as HTMLElement;
    element.click();
    this.loadingService.isLoading.next(true);
    this.subscriptions.push(
      this.accountService.changePassword(passwordChange).subscribe(
        response => {
          console.log(response);
          this.loadingService.isLoading.next(false);
          this.alertService.showAlert(
            "Le mot de passe a été mis à jour avec succès !",
            AlertType.SUCCESS
          );
        },
        error => {
          console.log(error);
          this.loadingService.isLoading.next(false);
          const errorMsg: string = error.error;
          // on appel la fonction d'erreur
          this.showErrorMessage(errorMsg);
        }
      )
    );
  }


  // une fonction pour les message d'erreur
  private showErrorMessage(errorMessage: string): void {
    if (errorMessage === 'PasswordNotMatched') {
      this.alertService.showAlert(
        "Les mots de passe ne correspondent pas. Veuillez réessayer !",
        AlertType.DANGER
      );
    } else if (errorMessage === 'IncorrectCurrentPassword') {
      this.alertService.showAlert(
        "Le mot de passe actuel est incorrect. Veuillez réessayer !",
        AlertType.DANGER
      );
    } else {
      this.alertService.showAlert(
        "Le changement de mot de passe a échoué. Veuillez réessayer !",
        AlertType.DANGER
      );
    }
  }


  // une fonction pour voir un seul Quiz
  seeOneQuiz(quizId:any): void {
    this.router.navigate(['/post', quizId]);
    console.log(quizId);
  }


  
  // Une fonction qui change de formaualire
  segmentChanged(val:any){
    this.segId = val.target.value;
  }


  // on Détruit
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
