import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from '../_Enum/alert-type';
import { Questions } from '../_Models/questions';
import { Reponses } from '../_Models/reponses';
import { AlertService } from '../_Services/alert.service';
import { LoadingService } from '../_Services/loading.service';
import { QuestionService } from '../_Services/question.service';
import { ReponseService } from '../_Services/reponse.service';

@Component({
  selector: 'app-add-reponse',
  templateUrl: './add-reponse.page.html',
  styleUrls: ['./add-reponse.page.scss'],
})
export class AddReponsePage implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  // Les O3 reponses
  reponse1 = new Reponses();
  reponse2 = new Reponses();
  reponse3 = new Reponses();

  // Une variable Reponse principale qui va prendre les 03 reponses
  reponse = new Reponses();

  // une variable pour la liste des listes
  questionList !: Questions[]

  // id de la question
  questionId !: any;

  questionIdGeter !: any

  // Une variable pour vérifier le choix de la reponse
  correctAnswer!: string

  host!: string;


  constructor(
    private loadingService: LoadingService,
    private questionService: QuestionService,
    private alertService: AlertService,
    private reponseService: ReponseService
  ) { }

  ngOnInit() {
    this.loadingService.isLoading.next(true);
    this.host = this.questionService.host;
    this.getQuestionList()
  }




  /* *********************** QUESTIONS LISTE
    Une fonctions pour avoir la liste de toutes les questions
 ************************* */
  getQuestionList(): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on appel la méthode getQuestionList dans notre questionService qui va retourné la liste de Questions
      this.questionService.getQuestionList().subscribe(
        // on va avoir une liste de reponse de Question
        (response: Questions[]) => {
          // on envoie cette liste de reposonse à notre variable questionList déclaré
          this.questionList = response;
          // on affiche la liste des Questions dans la console
          console.log(this.questionList);
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



  /* *********************** AJOUTER DES NOUVELLES REPONSES
   Une fonction qui sera appélér ajouter des nouvelles reponses
 ************************* */
  onNewResponse(): void {

    // Lier ID de la question au titre
    for (let i = 0; i < this.questionList.length; i++) {
      if (this.questionList[i].question == this.questionId) {
        this.questionIdGeter = this.questionList[i].id
        console.log(this.questionIdGeter)
      }
    }
    // On mets le chargement en true
    this.loadingService.isLoading.next(true);

    // Créeons une boucle pour enregistrer les 03 reponses à la fois
    for (let i = 1; i <= 3; i++) {

      if (i == 1) {
        // prenons la première reponse
        this.reponse = this.reponse1;
        // vérifier si l'utilisatateur coche cette reponse comme bonne reponse
        if (this.correctAnswer == "option1") {
          this.reponse.iscorrect = true
        } else {
          this.reponse.iscorrect = false
        }
      }

      else if (i == 2) {
        // prenons la deuxième reponse
        this.reponse = this.reponse2
        // vérifier si l'utilisatateur coche cette reponse comme bonne reponse
        if (this.correctAnswer == "option2") {
          this.reponse.iscorrect = true
        } else {
          this.reponse.iscorrect = false
        }
      }

      else if (i == 3) {
        // prenons la troisième reponse
        this.reponse = this.reponse3
        // vérifier si l'utilisatateur coche cette reponse comme bonne reponse
        if (this.correctAnswer == "option3") {
          this.reponse.iscorrect = true
        } else {
          this.reponse.iscorrect = false
        }
      }

      // On l'ajout dans la liste de subscriptions
      this.subscriptions.push(
        // on appel la méthode save dans notre reponseService pour enregistrer la Reponses
        this.reponseService.save(this.reponse, this.questionIdGeter).subscribe(
          // Quand on a une reponse de type Reponses
          (response: Reponses) => {
            // on affiche la reponse
            console.log(response);
            this.loadingService.isLoading.next(false);
            this.alertService.showAlert(
              "Reponses ajouter !",
              AlertType.SUCCESS
            );
          },
          error => {
            console.log(error);
            // vérifions si le message d'erreur correspond à ResponsExit du Backend
            const errorMsg = error.error;
            // vérifions si le message d'erreur correspond à ResponsExit du Backend
            if (errorMsg === 'ResponsExit') {
              this.alertService.showAlert(
                "Oups ! Reponses existent déjà !",
                AlertType.DANGER
              );
              this.loadingService.isLoading.next(false);
            }
          }
        )
      );


    }

  }


  // On Desinscrit en parcourant la liste des subscriptions
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
