import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  // Une variable pour stocker la liste des Utilisateurs;
  userList!: User[];

  // Variable pour afficher la photo
  userphoto!: string;

  // une variable pour recuperer et socker l'id de QUIZ
  quizId!: any




  constructor(
    private accountService: AccountService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUserList()
    this.userphoto = this.accountService.userHost;

    this.quizId = this.route.snapshot.params["id"]

  }


  // Une méthode pour avoir la liste des utilsateurs
  private getUserList() {
    this.accountService.getUserList().subscribe(
      (data) => {
        console.log(data)
        this.userList = data;
      })
  }



  // Une fonction click pour affecter un Quiz à un utilisateur qui va prendre en paramètre un username en paramètre
  AddQuizToQuiz(username: string) {
    this.quizService.addQuizToSutudent(this.quizId, username).subscribe((data) => {
      console.log(data);
    })

    // Affichions un message succès 
    this.alertService.showAlert(
      "Apprenant Assigner avec succès !",
      AlertType.SUCCESS
    );
  }




}
