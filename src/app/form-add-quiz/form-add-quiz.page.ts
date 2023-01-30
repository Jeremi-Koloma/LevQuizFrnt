import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-add-quiz',
  templateUrl: './form-add-quiz.page.html',
  styleUrls: ['./form-add-quiz.page.scss'],
})
export class FormAddQuizPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }


  goToQuestion(){
    this.router.navigate(['form-add-question'])
  }

}
