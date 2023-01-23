import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../_Services/account.service';
import { LoadingService } from '../_Services/loading.service';
import { AlertType } from '../_Enum/alert-type';
import { AlertService } from '../_Services/alert.service';
import { User } from '../_Models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {
  
  // une variable pour nos segement
  segId='Login';

  // une variable pour la validation de type FormGroup
  loginForm!:FormGroup

   // une variable pour la validation de type FormGroup
   registerForm!:FormGroup

   // C'est-à-dire que par defaut le formulaire n'est pas valider
   submitted = false;

  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];

  private subscriptionsRegister: Subscription[] = [];

  // Injections des dépendances
  constructor(
    private router: Router, // pour la redirection
    private accountService: AccountService, 
    private loadingService: LoadingService,
    private alertService: AlertService,

    private accountServiceRegister: AccountService,
    private routerRegister: Router,
    private loadingServiceRegister: LoadingService,
    private alertServiceRegister: AlertService,
    private formBulder: FormBuilder
  ) {}

  ngOnInit() {
     /* *********************** LOGIN
     Quand ce composant est initialiser, 
      Une fois que la connexion à reussi
      nous ne voulons pas qu'il reste sur la même page, on veut l'envoyé vers la page qu'il démande ou l'Accueil
     ************************* */

      // Vérifions si l'utilisateur s'est authentifier
      if (this.accountService.isLoggedIn()) {
        // on le laisse aller là ou il veut
        if (this.accountService.redirectUrl) {
          this.router.navigateByUrl(this.accountService.redirectUrl);
        } else { // sinon il s'est authentifier mais l'url n'existe pas, on le redirige à la page d'Accueil
          this.router.navigateByUrl('/home');
        }
      }
      // Sinon si la connexion n'a pas réussi, on le redirige vers la page de connexion
       else {
        this.router.navigateByUrl('/login');
      }

          /* ***********************
          validation des formulaire LOGIN
        ************************* */
      // Lorsque le component est initialiser, on utilise notre loginForm pour avoir accèss aux Groupe de FormBuilder qui est dans le constructeur;
      this.loginForm = this.formBulder.group({
        // Déclarons les champs ou validations qu'on souhaite avoir
        // Le première validation est required
        // maintenant d'éclarons les variables qui seront binder avec le formulaire avec formControlName puis ngClass dans le html au niveau des input
        username: ["", Validators.required],
        password: ["", Validators.required]
    })




        /* *********************** REGISTER
     Quand ce composant est initialiser,
      Une fois que la connexion à reussi
      nous ne voulons pas qu'il reste sur la même page, on veut l'envoyé vers la page d'Accueil
     ************************* */

       // Après l'inscription, Vérifions si l'utilisateur s'est authentifier
       if (this.accountServiceRegister.isLoggedIn()) {
        // on le laisse aller là ou il veut
        if (this.accountServiceRegister.redirectUrl) {
          this.routerRegister.navigateByUrl(this.accountServiceRegister.redirectUrl);
        } else { // sinon il s'est authentifier mais l'url n'existe pas, on le redirige à la page d'Accueil
          this.routerRegister.navigateByUrl('/home');
        }
      }
       // Sinon si la l'inscription n'a pas réussi, on le redirige vers la page de d'inscription 
      else {
        this.routerRegister.navigateByUrl('/login');
      }


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
          username: ["",  [Validators.required, Validators.minLength(4)]],
          password: ["",  [Validators.required, Validators.minLength(8)]],
          email: ["",  [Validators.required, Validators.email]]
      })


  }




  /* *********************** LOGIN
      Une fonction pour le Login
      Qui va prendre un user son username and password
  ************************* */
 // Quand on appel cette fonction onLogin
   onLogin(user: User): void {
    // on appel le service loadingService le chargement de la page
    this.loadingService.isLoading.next(true);
    // Affichons les informations de l'utilisateur dans la console
    console.log(user);
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie les identifiants de l'utilisateur à méthode login dans notre serviceAccount
      this.accountService.login(user).subscribe(
        // On prend la reponse dans le body
        response => {
          // on déclare une constante pour acceder à la response, puis le header pour recupérer le token
          const token : any = response.headers.get('Authorization');
          // on appel la méthode saveToken dans le serviceAccount pour enregister le token dans app front
          this.accountService.saveToken(token);
          // On vérifie s'il a un bon url de la page qu'il veut acceder et que l'authentification a réussi
          if (this.accountService.redirectUrl) {
            // on le redirige vers la page demande si elle existe
            this.router.navigateByUrl(this.accountService.redirectUrl);
          } 
          // Sinon on le redirige vers la page d'Accueil si l'authentification a réussi
          else {
            this.router.navigateByUrl('/home');
          }
          this.loadingService.isLoading.next(false);
        },
        error => {
          // sinon s'il ya erreur, on l'affiche dans la console
          console.log(error);
          this.loadingService.isLoading.next(false);
          // on appel la fonction de message
          this.alertService.showAlert(
            "Nom d'utilisateur ou le mots de passe est incorrect !",
            AlertType.DANGER
          );
        }
      )
    );
  }


  // Boutons qui de validation login
  onSubmitLogin(){
      // changeons la variable de submitted à true;
      this.submitted = true

      // Vérions si les champs sont invalid
      if(this.loginForm.invalid){
        return
      }
      else{
        // sinon si tous les champs sont remplis,
        alert("Succes !")
      }
  }





   /* *********************** REGISTER
      Une fonction pour register : inscription de l'utilisateur
      Qui va prendre un user toutes ses informations
    ************************* */
      // Quand on appel cette fonction onRegister
      onRegister(user : User): void {
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


    // Boutons qui de validation login
    onSubmitRegister(){
    // changeons la variable de submitted à true;
    this.submitted = true

    // Vérions si les champs sont invalid
    if(this.loginForm.invalid){
      return
    }
    else{
      // sinon si tous les champs sont remplis,
      alert("Succes !")
    }
}






  // On le Désinscrit
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe);

    //Register
    this.subscriptionsRegister.forEach(sub => sub.unsubscribe());
  }





  // Une fonction qui change de formaualire
  segmentChanged(val:any){
    this.segId = val.target.value;
  }



}
