import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../_Services/loading.service';
import { AccountService } from '../_Services/account.service';
import { AlertType } from '../_Enum/alert-type';
import { AlertService } from '../_Services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit, OnDestroy{

  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];

   // une variable pour la validation de type FormGroup
   resetpasswordForm!: FormGroup

  // C'est-à-dire que par defaut le formulaire n'est pas valider
  submitted = false;

  
  // Injections des dépendances
  constructor(
    private accountService: AccountService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService,
    private formBulder: FormBuilder
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


     /* ***********************
      validation des formulaire ResetPassword
    ************************* */
    // Lorsque le component est initialiser, on utilise notre loginForm pour avoir accèss aux Groupe de FormBuilder qui est dans le constructeur;
    this.resetpasswordForm = this.formBulder.group({
      // Déclarons les champs ou validations qu'on souhaite avoir
      // Le première validation est required
      // maintenant d'éclarons les variables qui seront binder avec le formulaire avec formControlName puis ngClass dans le html au niveau des input
      email: ["", [Validators.required, Validators.email]]
    })

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
              this.router.navigateByUrl('/emailsend')
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



    // Boutons qui de validation RessetPassword
    onSubmitForm() {
    // changeons la variable de submitted à true;
    this.submitted = true

    // Vérions si les champs sont invalid
    if (this.resetpasswordForm.invalid) {
      return
    }
    else {
      // sinon si tous les champs sont remplis,
      // alert("Succes !")
      // Quand le formualire est rempli, appelons la méthode onLogin(), on passe le formulaire
      this.onResetpassword(this.resetpasswordForm.value);
    }
  }



    // on le Desinscrit
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
