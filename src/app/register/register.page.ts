import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../_Services/loading.service';
import { AccountService } from '../_Services/account.service';
import { AlertType } from '../_Enum/alert-type';
import { AlertService } from '../_Services/alert.service';
import { User } from '../_Models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];

  // Injections des dépendances
  constructor(
    private accountService: AccountService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {

      /* ***********************
     Quand ce composant est initialiser,
      Une fois que la connexion à reussi
      nous ne voulons pas qu'il reste sur la même page, on veut l'envoyé vers la page d'Accueil
     ************************* */

       // Après l'inscription, Vérifions si l'utilisateur s'est authentifier
      if (this.accountService.isLoggedIn()) {
        // on le laisse aller là ou il veut
        if (this.accountService.redirectUrl) {
          this.router.navigateByUrl(this.accountService.redirectUrl);
        } else { // sinon il s'est authentifier mais l'url n'existe pas, on le redirige à la page d'Accueil
          this.router.navigateByUrl('/home');
        }
      }
       // Sinon si la l'inscription n'a pas réussi, on le redirige vers la page de d'inscription 
      else {
        this.router.navigateByUrl('/register');
      }

  }


    /* ***********************
      Une fonction pour register : inscription de l'utilisateur
      Qui va prendre un user toutes ses informations
    ************************* */
      // Quand on appel cette fonction onRegister
      onRegister(user : User): void {
        // on appel le service loadingService le chargement de la page
        this.loadingService.isLoading.next(true);
         // Affichons les informations de  l'utilisateur dans la console
        console.log(user);
        // On l'ajout dans la liste de subscriptions
        this.subscriptions.push(
          // on envoie les informations de l'utilisateur à la méthode Register dans notre serviceAccount
        this.accountService.register(user).subscribe(
          // On prend la reponse dans le body
          response => {
            // on stop le chargement de la page
            this.loadingService.isLoading.next(false);
            // on affiche une message à l'utilisateur
            this.alertService.showAlert(
              'Inscrit avec succès ! Merci de vérifier votre boîte mail.',
              AlertType.SUCCESS
            );
            // Affichons la reponse dans la console
            console.log(response);
          },
          // sinon s'il ya Erreur, on appel HttpErrorResponse pour vérifier si l'erreur est conforme à celui du Backend
          (error: HttpErrorResponse) => {
            // on affiche l'erreur dans la console
            console.log(error);
            // on stop l'effet de chargement de la page
            this.loadingService.isLoading.next(false);
            // Déclarons une constante pour vérifier les méssages avec celui du backend
            const errorMsg: string = error.error;
            // vérifions si le message d'erreur correspond à usernameExist du Backend
            if (errorMsg === 'usernameExist') {
              this.alertService.showAlert(
                "Ce nom d'utilisateur existe déjà ! Veuillez essayer avec un autre nom d'utilisateur",
                AlertType.DANGER
              );  
              // Sinon vérifions si le message d'erreur correspond à emailExist du Backend
            } else if (errorMsg === 'emailExist') {
              this.alertService.showAlert(
                "Cette adresse e-mail existe déjà ! Veuillez essayer avec une autre adresse e-mail",
                AlertType.DANGER
              );
            } else {
              this.alertService.showAlert(
                "Un problème est survenu. Veuillez réessayer !",
                AlertType.DANGER
              );
            }
          }
        )
        );
      }


  // On le Désinscrit
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
