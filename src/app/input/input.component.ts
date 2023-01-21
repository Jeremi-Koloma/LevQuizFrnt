import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {


  // Ces input sont binder avec celut du html
  @Input() label! : string;
  @Input() type! : string;
  
  constructor() { }

  ngOnInit() {}

}
