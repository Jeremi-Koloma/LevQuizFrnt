import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from '../_Enum/alert-type';
import { User } from '../_Models/user';
import { AccountService } from '../_Services/account.service';
import { AlertService } from '../_Services/alert.service';
import { QuizService } from '../_Services/quiz.service';

@Component({
  selector: 'app-assigner-apprenant',
  templateUrl: './assigner-apprenant.page.html',
  styleUrls: ['./assigner-apprenant.page.scss'],
})
export class AssignerApprenantPage implements OnInit {

  private subscriptions: Subscription[] = [];
  
  // Une variable pour stocker la liste des Utilisateurs;
  userList!: User[];

  // Variable pour afficher la photo
  userphoto!: string;

  // une variable pour recuperer et socker l'id de QUIZ
  quizId!: any

  isClicked: boolean = false

  quizTitre!: string;

  titre: any = [];

  searchedUser!: User[];

  userHost!: string;


  constructor(
    private router: Router,
    private accountService: AccountService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    // La fonction qui retourne la liste des utilisteurs(Apprennant)
    this.getUserList()

    setTimeout(() => {
      for (let i = 0; i < this.userList.length; i++) {
        this.getUserAssigner(i)
      }
    }, 500)

    // Le path de photo de profil
    this.userphoto = this.accountService.userHost;

    this.quizId = this.route.snapshot.params["id"]

    // La fonctions qui retourne un seul quiz
    this.TogetOneQuizById()
    
  }


  // Une méthode pour avoir la liste des utilsateurs
  private getUserList() {
    this.accountService.getUserList().subscribe(
      (data) => {
        console.log(data)
        this.userList = data;

        for (let i = 0; i < this.userList.length; i++) {
          for (let j = 0; j < this.userList[i].notificationsList.length; j++) {
            if (this.userList[i].notificationsList[j].titrequiz == this.quizTitre) {
              this.titre.push(this.quizTitre)
            }
          }

        }
      })

  }



  getUserAssigner(i: number): boolean {

    if (this.userList[i].notificationsList.length == 0) {
      return this.isClicked = false
    }
    for (let j = 0; j < this.userList[i].notificationsList.length; j++) {

      if (this.userList[i].notificationsList[j].titrequiz == this.quizTitre) {
        this.titre.push(this.quizTitre)

        if (this.titre[i] == this.quizTitre) {
          this.isClicked = true
        }

      }
    }

    // }
    return this.isClicked
  }



  // Une fonction click pour affecter un Quiz à un utilisateur qui va prendre en paramètre un username en paramètre
  AddQuizToQuiz(username: string) {
    this.quizService.addQuizToSutudent(this.quizId, username).subscribe((data) => {
      console.log(data);
      this.getUserList()
    })

    // Affichions un message succès 
    this.alertService.showAlert(
      "Apprenant Assigner avec succès !",
      AlertType.SUCCESS
    );

    setTimeout(() => {
      window.location.reload();
      this.ngOnInit()
    }, 3000)

  }



  // Une méthode pour Recupérer un seul quiz
  TogetOneQuizById() {
    this.quizService.getOneQuizById(this.quizId).subscribe(
      (data) => {
        this.quizTitre = data.titre
        console.log(data)
      })
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


    getSearchUserProfile(username: string): void {
      //this.router.navigate(['/profile', username]);
      setTimeout(() => {
        location.reload();
      }, 20000);
    }




}
