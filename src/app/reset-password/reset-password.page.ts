import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../_Services/loading.service';
import { AccountService } from '../_Services/account.service';
import { AlertType } from '../_Enum/alert-type';
import { AlertService } from '../_Services/alert.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit, OnDestroy{

  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];

  
  // Injections des dépendances
  constructor(
    private accountService: AccountService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {

       /* ***********************
     Quand ce composant est initialisé,
      Une fois que le mots de passe est renitialisé,
      nous ne voulons pas qu'il reste sur la même page, on veut l'envoyé vers la page d'Accueil
     ************************* */
    if (this.accountService.isLoggedIn()) {
      if (this.accountService.redirectUrl) {
        this.router.navigateByUrl(this.accountService.redirectUrl);
      } else {
        this.router.navigateByUrl('/home');
      }
    } else {
      this.router.navigateByUrl('/resetpassword');
    }

  }


    /* ***********************
      Une fonction pour onResetpassword : mots de passe oublié
      Qui va prendre un user toutes ses informations
    ************************* */
      // Quand on appel cette fonction onResetpassword
      onResetpassword(form:any): void {
        // on appel le service loadingService le chargement de la page
        this.loadingService.isLoading.next(true);
        // Affichons les l'email de  l'utilisateur dans la console
        console.log(form.email);
        // Déclarons une constante qui va recevoir l'email
        const email: string = form.email;
         // On l'ajout dans la liste de subscriptions
        this.subscriptions.push(
          // on envoie les l'email de l'utilisateur à la méthode resetPassword dans notre serviceAccount
          this.accountService.resetPassword(email).subscribe(
            // On prend la reponse 
            response => {
              // Quand nous avons une reponse, on sait que ça a marché donc affichons la reponse dans la console
              console.log(response);
              // on stop de chargement de la page
              this.loadingService.isLoading.next(false);
              // on affiche une message à l'utilisateur
              this.alertService.showAlert(
                "Un nouveau mot de passe a été envoyé à votre adresse e-mail",
                AlertType.SUCCESS
              );
            }, // Sinon s'il ya Erreur
            (error: HttpErrorResponse) => {
              // on affiche l'Erreur dans la console
              console.log(error);
              // vérifions si le message d'erreur correspond à usernameExist du Backend
              const errorMsg = error.error;
              // vérifions si le message d'erreur correspond à emailNotFound du Backend
              if (errorMsg === 'emailNotFound') {
                this.alertService.showAlert(
                  "Il n'y a pas de compte pour cet email. Veuillez vérifier l'email",
                  AlertType.DANGER
                );
              }
              if (errorMsg !== 'emailNotFound') {
                this.alertService.showAlert(
                  "Un problème est survenu. Veuillez réessayer !",
                  AlertType.DANGER
                );
              }
              this.loadingService.isLoading.next(false);
            }
          )
        );
      }


    // on le Desinscrit
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
