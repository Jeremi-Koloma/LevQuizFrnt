import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverConstant } from '../_Constant/serverConstant';
import { Reponses } from '../_Models/reponses';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

   // Déclarons des variables
   constant: serverConstant = new serverConstant();
   // Le serve backend
   public host = this.constant.host;

  // Créeons une instance de service Http
  constructor(private http: HttpClient) { }

  // Une fonction qui permettra d'ajouter une Reponses
  save(reponse: Reponses, idquestion: number): Observable<Reponses> {
    return this.http.post<Reponses>(`${this.host}/reponses/create/${idquestion}`, reponse);
  }
}
