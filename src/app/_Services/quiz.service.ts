import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'; // pour les requêtes http
import { Observable } from 'rxjs'; // pour l'utilisation des observable
import { serverConstant } from '../_Constant/serverConstant'; // Importation de la classe Constantes
import { Quiz } from '../_Models/quiz'; // Importation de la classe Quiz

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  constructor() { }
}
