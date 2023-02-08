import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from '../_Enum/alert-type';
import { User } from '../_Models/user';
import { AccountService } from '../_Services/account.service';
import { AlertService } from '../_Services/alert.service';
import { LoadingService } from '../_Services/loading.service';

@Component({
  selector: 'app-register-formateur',
  templateUrl: './register-formateur.page.html',
  styleUrls: ['./register-formateur.page.scss'],
})
export class RegisterFormateurPage implements OnInit {

  // une variable pour la validation de type FormGroup
  registerForm!: FormGroup

  private subscriptionsRegister: Subscription[] = [];

  // C'est-à-dire que par defaut le formulaire n'est pas valider
  submitted = false;

  constructor(
    private accountServiceRegister: AccountService,
    private routerRegister: Router,
    private loadingServiceRegister: LoadingService,
    private alertServiceRegister: AlertService,
    private formBulder: FormBuilder,
  ) { }

  ngOnInit() {

    /* ***********************
      validation des formulaire REGISTER
    ************************* */
    // Lorsque le component est initialiser, on utilise notre loginForm pour avoir accèss aux Groupe de FormBuilder qui est dans le constructeur;
    this.registerForm = this.formBulder.group({
      // Déclarons les champs ou validations qu'on souhaite avoir
      // Le première validation est required
      // maintenant d'éclarons les variables qui seront binder avec le formulaire avec formControlName puis ngClass dans le html au niveau des input
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.email]],
      specialite: ["", Validators.required],
      entreprise: ["", Validators.required],
      localite: ["", Validators.required],
    })


  }



  /* *********************** REGISTER
   Une fonction pour register : inscription de l'utilisateur
   Qui va prendre un user toutes ses informations
 ************************* */
  // Quand on appel cette fonction onRegister
  onRegister(user: User): void {
    // on appel le service loadingService le chargement de la page
    this.loadingServiceRegister.isLoading.next(true);
    // Affichons les informations de  l'utilisateur dans la console
    console.log(user);
    // On l'ajout dans la liste de subscriptions
    this.subscriptionsRegister.push(
      // on envoie les informations de l'utilisateur à la méthode Register dans notre serviceAccount
      this.accountServiceRegister.register(user).subscribe(
        // On prend la reponse dans le body
        response => {
          // on stop le chargement de la page
          this.loadingServiceRegister.isLoading.next(false);
          // on affiche une message à l'utilisateur
          this.alertServiceRegister.showAlert(
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
          this.loadingServiceRegister.isLoading.next(false);
          // Déclarons une constante pour vérifier les méssages avec celui du backend
          const errorMsg: string = error.error;
          // vérifions si le message d'erreur correspond à usernameExist du Backend
          if (errorMsg === 'usernameExist') {
            this.alertServiceRegister.showAlert(
              "Ce nom d'utilisateur existe déjà ! Veuillez essayer avec un autre nom d'utilisateur",
              AlertType.DANGER
            );
            // Sinon vérifions si le message d'erreur correspond à emailExist du Backend
          } else if (errorMsg === 'emailExist') {
            this.alertServiceRegister.showAlert(
              "Cette adresse e-mail existe déjà ! Veuillez essayer avec une autre adresse e-mail",
              AlertType.DANGER
            );
          } else {
            this.alertServiceRegister.showAlert(
              "Un problème est survenu. Veuillez réessayer !",
              AlertType.DANGER
            );
          }
        }
      )
    );
  }


  // Boutons qui de validation Inscription
  onSubmitRegister() {
    // changeons la variable de submitted à true;
    this.submitted = true

    // Vérions si les champs sont invalid
    if (this.registerForm.invalid) {
      return
    }
    else {
      // sinon si tous les champs sont remplis,
      // alert("Succes !")
      // Quand le formualire est rempli, appelons la méthode onLogin(), on passe le formulaire
      this.onRegister(this.registerForm.value);
    }
  }




}
