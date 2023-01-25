import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; // importation de service Route Angular
import { Subscription } from 'rxjs';
import { AccountService } from '../_Services/account.service'; // importation de Accountservice
import { LoadingService } from '../_Services/loading.service'; // importation loadingService
import { AlertService } from '../_Services/alert.service'; // importation de AlertService
import { QuizService } from '../_Services/quiz.service'; // importation de QuizService
import { AlertType } from '../_Enum/alert-type';  // importation de AlertType Enum
import { Quiz } from '../_Models/quiz'; // importation de Quiz le Model
import { User } from '../_Models/user';  // importation de User le Model
import { CustomDatePipe } from '../custom-date.pipe';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy  {

  // Déclarons des variables

  mesSlides = {
    slidesPerView:1,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    loop:true,
    spaceBetween:10,
    autoplay:true
  }
  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];
  // un object d'utilisateur
  user = new User();
  // Une variable pour la liste des Quiz
  quizs: Quiz[] = [];
  // une variable pour le nom de serveur
  host!: string;
  // le path de l'utilisateur
  userHost!: string;
  quizHost!: string;
  userphoto!: string ;
  nombreNotification!: number;

  // Injections des dépendances
  constructor(
    private router: Router,
    private accountService: AccountService,
    private quizService: QuizService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}


  ngOnInit() {
    this.userphoto=this.accountService.userHost

    this.loadingService.isLoading.next(true);
    this.getUserInfo(this.accountService.loggInUsername)
  
    this.getUserInfo(this.accountService.loggInUsername);
    // Appelons la fonction de la liste de tout les quiz
    this.getQuiz();
    
    this.host = this.quizService.host;
    this.userHost = this.quizService.userHost;
    this.quizHost = this.quizService.quizHost;
    this.loadingService.isLoading.next(false);
  }



  // Une fonctions qui va retourné les informations d'un utilisateur qui va prendre le nom de user en param
  getUserInfo(username: string): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie l'utilisateur à méthode getUserInformation dans notre serviceAccount
      this.accountService.getUserInformation(username).subscribe(
        // on retourne une reponse de type User
      (response: User) => {
        // on affecte cet reponse à notre variable user qui represente l'utilisateur
        this.user = response;
        // comptons le nombre de notification de l'utilisateur
        this.nombreNotification=this.user.notificationsList.length;
        console.log(this.user)
        console.log(this.nombreNotification)
      },
      error => {
        // si ya erreur on affiche l'erreur dans la console
        console.log(error);
        //this.user = null;
        // on appel la fonction logOut() pour déconnecter l'utilisateur
        this.logOut();
        // et on le redirige vers la page de connexion
        this.router.navigateByUrl('/login');
      }
    ));
  }



  // Une fonction pour Déconnexion
  logOut(): void {
    // on appel la fonction logOut() qui se trouve dans nore service pour déconnecter l'utilisateur
    this.accountService.logOut();
    // on le redirige vers la page de connexion
    this.router.navigateByUrl('/login');
    // On l'affiche un message
    this.alertService.showAlert(
      "Vous devez vous connecter pour accéder à cette page !",
      AlertType.DANGER
    );
  }



  // une fonction pour permettre à l'utilisateur de voir son profil
  getUserProfile(username: string): void {
    // on appel le path qui permettre d'acceder au profil avec le nom d'utilisateur en paramètre
    this.router.navigate(['/profile', username]);
    // On affiche l'utilisateur dans la console
    console.log("Nom d'utilisateur : "+username);
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



  // Une méthode pour Supprimer un Quiz qui va prendre ID de quiz en paramètre
  onDelete(quizId: number): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on appel la méthode delete qui se trouve dans notre quizService pour supprimer l'utilisateur
      this.quizService.delete(quizId).subscribe(
        // on prend la reponse
      response => {
        // on affiche dans la reponse ou le quiz dans la console
        console.log('Quiz supprimer: ', response);
        // on l'affiche un message
        this.alertService.showAlert(
          'Quiz supprimer avec succès !.',
          AlertType.SUCCESS
        );
        // on appel la fonction qui retourne la liste de toute les Quiz
        this.getQuiz();
      },
      // SI ya erreur, on affiche erreur dans la console
      error => {
        console.log(error);
        // Si ya erreur on affiche un message d'erreur à l'utilisateur
        this.alertService.showAlert(
          'Quiz non supprimer, veuillez ressayer encore !',
          AlertType.DANGER
        );
        this.getQuiz();
      }
    ));
  }



  // Une function pour voir un seul Quiz qui va prendre l'ID de quiz en paramètre
  seeOneQuiz(quizId:any): void {
    // on appel le path qui permet d'acceder à un seul Quiz
    this.router.navigate(['/quizdetails', quizId]);
    console.log(quizId);
  }

  //
  goToQuiz(){
    
  }



  // On Desinscrit en parcourant la liste des subscriptions
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
