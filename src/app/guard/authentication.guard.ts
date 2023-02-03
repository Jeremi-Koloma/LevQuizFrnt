import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_Services/account.service'; // Importation de ServiceAccount
import { AlertService } from '../_Services/alert.service'; // Importation AlertSerice
import { AlertType } from '../_Enum/alert-type'; // Importation AlertType

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  // Créeons une instance de notre accountService pour avoir accès à la méthode qui permet de vérifier si l'utilisateur s'est connecter ou pas avant d'acceder à une ressource
  // Créeons une instance de la classe alertserivce pour le message d'alert
  // Injectons encore le Service Router pour la Redirection
  constructor(private accountService: AccountService, private alertService: AlertService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // On retoune notre fonction
      return this.isLoggedIn(state.url);
  }

  // Une variable pour vérifier si l'utilisateur s'est authentifier
  private isLoggedIn(url: string): boolean {
    if (this.accountService.isLoggedIn()) {
      // s'il s'est authentifier, ça retourne true 
      return true;
    }
    // S'il ne s'est pas authentifier, alors recupérons son actuel URL et le rediriger vers la page Login
    this.accountService.redirectUrl = url;
    this.router.navigate(['/login']);
    // On l'envoie un message d'Erreur
    this.alertService.showAlert("Veuillez vous authentifier !", AlertType.DANGER);
    return false;
  }

  
}
