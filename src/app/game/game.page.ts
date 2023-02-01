import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor() { }

  questions: any[] = [];

  // Selectionner les boutons 
  start_btn = document.querySelector(".start_btn button");
  info_box = document.querySelector(".info_box");
  exit_btn = this.info_box?.querySelector(".buttons .quit");
  continue_btn = this.info_box?.querySelector(".buttons .restart");
  quiz_box = document.querySelector(".quiz_box");
  result_box = document.querySelector(".result_box");
  option_list = document.querySelector(".option_list");
  time_line = document.querySelector("header .time_line");
  timeText = document.querySelector(".timer .time_left_txt");
  timeCount = document.querySelector(".timer .timer_sec");



  // Une fonction quand on click sur le bouton start_btn
  onStartBtn() {
    this.start_btn?.addEventListener("click", () => {
      this.info_box?.classList.add("activeInfo");
    })
  }





  test1() {
    this.questions = [
      {
        numb: 1,
        question: "Que signifie HTML ?",
        answer: "Hyper Text Markup Language",
        options: [
          "Hper Text Processor",
          "Hper Text Multiple Language"
        ]
      },

      {
        numb: 2,
        question: "Que signifie CSS ?",
        answer: " Cascading Style Sheets",
        options: [
          " Create Simple Samples",
          "C'est Super Simple"
        ]
      },

      {
        numb: 3,
        question: "À quoi sert le langage CSS ? ",
        answer: "À ajouter du style aux documents web",
        options: [
          " À réaliser des pages dynamiques",
          " À insérer du contenu dans une page internet"
        ]
      },

      {
        numb: 4,
        question: "Pourquoi utilise-t-on généralement du CSS ?",
        answer: "Pour se compliquer la vie bien sûr",
        options: [
          " Pour séparer le contenu et la présentation des documents web",
          " Cela permet de faire de plus jolis dégradés de couleurs"
        ]
      },

      {
        numb: 5,
        question: "Où est-il conseillé de placer le code CSS ?",
        answer: " Dans le <body>, c'te question",
        options: [
          "Entre les balises <head>, c'est bien plus propre",
          "Dans un fichier JavaScript"
        ]
      },

    ]
  }

  ngOnInit() {
    this.onStartBtn()
  }

}
