import { Injectable } from '@angular/core';
import {
HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { serverConstant } from '../_Constant/serverConstant'; // Importation de la classe Constantes
import { CacheService } from '../_Services/cache.service'; // Importation de Service CacheService
import { AccountService } from '../_Services/account.service';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    // Créeons un object de constante pour avoir accès aux méthodes définient dans cette classe 
  constant: serverConstant= new serverConstant();
  // Une variable pour le host : le server backend
  private host: string = this.constant.host;

  // injectons notre CacheService dans le constructeur pour avoir accès aux méthodes définis dans la classe CacheService
  constructor(private accountService : AccountService, private cacheService: CacheService) {}

  /* ***********************
    La méthode intercept() a deux argument :
        //La première (req) est la demande de type HttpRequest et peut avoir n'importe quel type de données
        // La seconde (next) traitera la demande et la laissera continuer son voyage.
        // La méthode intercept() est de type Observable et peut recevoir tout type d'événements.
    ************************* */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* ***********************
        Pour des requêtes de types (POST, PUT, DELETE)  qui changeront des informations dans la base de données, 
        nous allons vider le cache pour qu'il ait une reconnexion avec la base de données
    ************************* */
   
    // vérifions si la méthode de la requête est strictement différent de GET, alors on vide le cache
    if (req.method !== 'GET') {
      this.cacheService.clearCache();
      // on vide le cache et la requête sera une nouvelle quête vers le backend
      return next.handle(req);
    }


     /* ***********************
        Pour Stocker les caches, nous ne voulons pas stocker les caches de ces requêtes 
        (LOGIN - REGISTER - RESETPASSWORD - FINDBYUSERNAME)  et pour faire cela,
        Grâce avec la méthode (.includes) de URL, nous allons vérifier si la requête contient ces méthode
    ************************* */

    if (req.url.includes(`${this.host}/user/resetPassword/`)) {
        //une nouvelle quête vers le backend
      return next.handle(req);
    }


    if (req.url.includes(`${this.host}/user/register`)) {
        //une nouvelle quête vers le backend
      return next.handle(req);
    }


    if (req.url.includes(`${this.host}/user/login`)) {
        //une nouvelle quête vers le backend
      return next.handle(req);
    }


    if (req.url.includes(`${this.host}/user/findByUsername/`)) {
        //une nouvelle quête vers le backend
      return next.handle(req);
    }


    // Une variable pour avoir un cache
    const cachedResponse: HttpResponse<any> | null = this.cacheService.getCache(req.url);

    // vérifions si on trouve une reponse dans le cache, on le retourne
    if (cachedResponse) {
      return of (cachedResponse);
    }

    return next.handle(req)
    .pipe(tap(event => {
      if (event instanceof HttpResponse) {
      this.cacheService.cacheRequest(req.url, event);
    }}));

  }
}
