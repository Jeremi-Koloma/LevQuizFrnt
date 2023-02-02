import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverConstant } from '../_Constant/serverConstant';
import { PrizeInfo } from '../_Models/prize-info';
import { QuestTest } from '../_Models/quest-test';
import { Questions } from '../_Models/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  // Déclarons des variables
  constant: serverConstant = new serverConstant();
  // Le serve backend
  public host = this.constant.host;



  // Une variable pour conter
  private quesionCount: number = 0 

  // le faut module question
  private quesions: QuestTest[] = [

    {
      title: 'Question 1',
      answer: [
        {
          description: 'Reponse 1 ',
          isRight: false
        },
        {
          description: 'Reponse 2 ',
          isRight: true
        },
        {
          description: 'Reponse 3 ',
          isRight: false
        },
      ],
      level : 1
    },

    {
      title: 'Je suis question 2',
      answer: [
        {
          description: 'moi Reponse 1 ',
          isRight: true
        },
        {
          description: ' toi Reponse 2 ',
          isRight: false
        },
        {
          description: ' lui Reponse 3 ',
          isRight: false
        },
      ],
      level : 1
    },

    {
      title: 'Tu est Question 3',
      answer: [
        {
          description: 'nous Reponse 1 ',
          isRight: false
        },
        {
          description: ' vous Reponse 2 ',
          isRight: false
        },
        {
          description: 'moi Reponse 3 ',
          isRight: true
        },
      ],
      level : 1
    },

    {
      title: 'Question 4',
      answer: [
        {
          description: 'Reponse 1 ',
          isRight: false
        },
        {
          description: 'Reponse 2 ',
          isRight: true
        },
        {
          description: 'Reponse 3 ',
          isRight: false
        },
      ],
      level : 1
    },

  ]

  // Une variable pour le points de la question
  private quesionPrizes = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
  ]


  // Créeons une instance de service Http
  constructor(
    private http: HttpClient) {
      this.quesions.sort((a, b) => 0.5 - Math.random());
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


  



  nxtQuesion():QuestTest{
    // Pour gener une question aleatoirement
    const randomIndex : number = Math.floor(Math.random() * this.quesions.length)
    this.quesionCount++;
    console.log(this.getPrizeInfo())
    return this.quesions.splice(randomIndex, 1)[0];
  }


  getPrizeInfo(): PrizeInfo{

    const curQuesionPrize = this.quesionPrizes[this.quesionCount -1];

    const accumulated =  this.quesionPrizes[this.quesionCount -2]

    return {
      correctAnswer : curQuesionPrize,
      wrongAnswer : this.quesionCount === 1  || this.quesionCount === 16 ? 0 : accumulated/2,
      quit : this.quesionCount === 1 ? 0 : accumulated
    };
  }




}


