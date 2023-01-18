
    /* ***********************
        Cette Classe Service va intercepter toutes les requêtes et nous pouvons les manupiler à notre guise
         avant de les envoyer dans le server backend
    ************************* */

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_Services/account.service'; // Importation de notre ServiceAccount

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // Injectons notre AccountService pour avoir accès aux méthodes définient dans le service
  constructor(private accountService: AccountService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     /* ***********************
        Interceptons la requête et vérifions l'URL si elle contient ses path, on la laisse passer sans authentification
        par ce qu'on a pas besoin de s'authentifier pour avoir accès à ces ressources
    ************************* */

    if (req.url.includes(`${this.accountService.host}/user/login`)) {
        // on laisse passer la requête
      return next.handle(req);
    }


    if (req.url.includes(`${this.accountService.host}/user/register`)) {
        // on laisse passer la requête
      return next.handle(req);
    }


    if (req.url.includes(`${this.accountService.host}/user/resetPassword/`)) {
        // on laisse passer la requête
      return next.handle(req);
    }


    if (req.url.includes('https://maps.googleapis.com/')) {
        // on laisse passer la requête
      return next.handle(req);
    }



     /* ***********************
        A part ces chemins, ou ses routes définient en haut, toute requête necessite une Authentification
    ************************* */

    // On charge le token
    this.accountService.loadToken();
    // une variable pour Recupérer le Token
    const token = this.accountService.getToken();
     /* Vu qu'on ne peut pas modifier la requête principale alors qu'on veut ajouter le token dans le Hearder de la requêt, 
     on doit la clonner d'abord pour ajouter le token dans le Headear de la requête côté front avant de l"envoyer vers le Backend */
    const request = req.clone({ setHeaders: { Authorization: token } });
    // maintent nous avons un token dans la requête, donc on la laisse passer vers le server backend
    return next.handle(request);
  }

}
