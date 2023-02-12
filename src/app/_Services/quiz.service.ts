import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'; // pour les requêtes http
import { Observable } from 'rxjs'; // pour l'utilisation des observable
import { serverConstant } from '../_Constant/serverConstant'; // Importation de la classe Constantes
import { Quiz } from '../_Models/quiz'; // Importation de la classe Quiz

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  // Déclarons des variables
  constant: serverConstant = new serverConstant();
  // Le serve backend
  public host = this.constant.host;

  public clientHost = this.constant.client;
  public userHost = this.constant.userPicture;
  public quizHost = this.constant.quizPicture;

  // Créeons une instance de service Http
  constructor(private http: HttpClient) { }

  // Une fonction qui permettra d'ajouter un nouveau Quiz
  save(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.host}/quiz/save`, quiz);
  }


  // Une fonction qui permettra d'avoir un quiz par son ID
  getOneQuizById(quizId: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.host}/quiz/getQuizById/${quizId}`);
  }

  // Une méthode qui permettra avoir la liste des quiz d'un utilisateur par son username
  getQuizByUsername(username: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.host}/quiz/getQuizByUsername/${username}`);
  }

  // Une méthode ou fonction qui permettra de supprimer un Quiz
  delete(quizId: number): Observable<Quiz> {
    return this.http.delete<Quiz>(`${this.host}/quiz/delete/${quizId}`);
  }


  // Une fonction qui permettra d'ajouter une image à un quiz
  uploadQuizPicture(recipePicture: File) {
    // déclarons un object javascript
    const fd = new FormData();
    fd.append('image', recipePicture, recipePicture.name);
    return this.http.post(`${this.host}/quiz/photoQuiz/upload`, fd, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events'
    });
  }



  // *****************************      AFFECTER UN QUIZ A UN UTILISATEUR   ******************************
  // Une fonction qui va te permettre d'affecter un quiz un utilsateur
  addQuizToSutudent(quizId: number, username: string): Observable<any> {
    return this.http.post<any>(`${this.host}/quiz/addQuizToStudent/${quizId}/${username}`, null);
  }


  // *****************************      CONNAITRE UTILISATEUR QUI A JOUER      *******************************
  // Une fonction qui permettrade connaître l'utilisateur qui a participer à un quiz
  getUserPalyingQuiz(iduser: number, idquiz: number): Observable<any> {
    return this.http.post<any>(`${this.host}/user/playQuiz/${iduser}/${idquiz}`, null);
  }


}


