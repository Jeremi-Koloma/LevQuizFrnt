import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from '../_Enum/alert-type';
import { Quiz } from '../_Models/quiz';
import { User } from '../_Models/user';
import { AccountService } from '../_Services/account.service';
import { AlertService } from '../_Services/alert.service';
import { LoadingService } from '../_Services/loading.service';
import { QuizService } from '../_Services/quiz.service';

@Component({
  selector: 'app-ajouter-quiz',
  templateUrl: './ajouter-quiz.page.html',
  styleUrls: ['./ajouter-quiz.page.scss'],
})
export class AjouterQuizPage implements OnInit, OnDestroy {

  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];

  // Une variable pour la liste de tous les Quiz
  quizs: Quiz[] = [];

  // Une variable pour la liste des Quiz d'un utilisateur
  quizListe!: Quiz[];

  user!: User;
  
  username!: any;

  quizId!: number;

  // une variable pour le nom de serveur
  host!: string;
  // le path de l'utilisateur
  userHost!: string;

  quizHost!: any;
  
  showOwnerQuiz!: any;

  // Déclarons des variables
  mesSlides = {
    slidesPerView: 1,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider: true,
    //loop: true,
    spaceBetween: 5,
    autoplay: true
  }

  // une variable pour la pagination
  p: number = 1;

  // Injections des dépendances
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private quizService: QuizService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // Quand le composant est initialiser


    this.loadingService.isLoading.next(true);
    // Appelons la fonction de la liste de tout les quiz
    this.getQuiz();
    this.host = this.quizService.host;
    this.userHost = this.quizService.userHost;
    this.quizHost = this.quizService.quizHost;
    this.loadingService.isLoading.next(false);
    this.username = this.route.snapshot.paramMap.get('username');
    this.getUserInfo(this.accountService.loggInUsername);
    this.loadingService.isLoading.next(false);

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
          console.log(this.user);

          // **********  Cette boucle marche ***

          // for(let i=0; i<this.user.userRoles.length; i++){
          //   if(this.user.userRoles[i].role.name==="FORMATEUR"){
          //     this.role=this.user.userRoles[i].role
          //   }
          // }

          // Vérifions si l'utilisateur a un compte Formateur, il peut faire des Ajout
          for (let i = 0; i < this.user.userRoles.length; i++) {
            if (this.user.userRoles[i].role.name.includes("FORMATEUR")) {
              this.showOwnerQuiz = true;
              console.log("---- Compte Formateur ----")
            }
            // Sinon si l'utilisateur a un compte Apprenant, on caches les Ajouts
            else {
              this.showOwnerQuiz = false;
              console.log("--- Compte Apprenant ------")
            }
          }
          this.quizListe = response.quizList
          // on appel la fontions qui retourne la liste de tout les quiz d'un utilisateur
          this.getQuizsByUsername(this.user.username);


        },
        error => {
          console.log(error);
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
        }
      )
    );
  }



  // Une function pour voir un seul Quiz qui va prendre l'ID de quiz en paramètre
  seeOneQuiz(quizId: number): void {
    // on appel le path qui permet d'acceder à un seul Quiz
    this.router.navigate(['/quizdetails', quizId]);
    console.log(quizId);
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

  



  // Redirection
  goToAddQuizForm() {
    this.router.navigate(['form-add-quiz'])
  }



  // On Desinscrit en parcourant la liste des subscriptions
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
