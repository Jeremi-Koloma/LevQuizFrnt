import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from '../_Models/quiz'; // importation de Model Quiz
import { QuizService } from './quiz.service'; // importation du service Quiz

@Injectable({
  providedIn: 'root'
})

  /* ***********************
     Cette classe va implementé le service Resolve de Angular Router qui retourne un Quiz avec toutes
     les information. Par Défaut on ne va pas tout afficher. C'est pour optimiser user Expériences
  ************************* */
export class QuizresolverService implements Resolve<Quiz> {

  // injectons le serviceQuiz dans le constructeur pour avoir accès à la méthode getOneQuizById
  constructor(private quizService : QuizService) { }

  // implementons resolve(), ça va prendre un route 
  resolve(route: ActivatedRouteSnapshot): Observable<Quiz> {
    // Recupérons id de Quiz qui sera dans l'URL
    const id: number = route.params['id'];
    // on retourne le Quiz avec informations complète à travers l'id
    return this.quizService.getOneQuizById(id);
  }

}
