import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverConstant } from '../_Constant/serverConstant';
import { Questions } from '../_Models/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // Déclarons des variables
  constant: serverConstant = new serverConstant();
  // Le serve backend
  public host = this.constant.host;




  // Créeons une instance de service Http
  constructor(
    private http: HttpClient) {
    
     }

  // Une fonction qui permettra d'ajouter une Question
  save(question: Questions, idquiz: number): Observable<Questions> {
    return this.http.post<Questions>(`${this.host}/Questions/saveQuestion/${idquiz}`, question);
  }

  // *****************************      LISTE DE QUIZ       *******************************
  // Une fonction pour avoir la liste des Quiz
  getQuestionList(): Observable<Questions[]> {
    return this.http.get<Questions[]>(`${this.host}/Questions/listQuestion`);
  }





}


