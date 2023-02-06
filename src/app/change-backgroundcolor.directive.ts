import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBackgroundcolor]'
})
export class ChangeBackgroundcolorDirective {

  // Cette variable soit c'est correct ou false pou changer la couleur de background en fonction de la valeur
  @Input() isCorrect: Boolean = false;

  // Injections ElementRef dans notre contructeur
  // Injectons Renderer2 pour le style
  constructor(private elementRef: ElementRef, private render: Renderer2) { }

  // Vérifions ou écoutons evenèment click
  @HostListener('click') answer() {
    // vérifons la iscorrect = true
    if (this.isCorrect) {
      // Si la reponse est correct, on change le background à vert
      this.render.setStyle(this.elementRef.nativeElement, 'background', 'green');
      // on change la couleur de text
      this.render.setStyle(this.elementRef.nativeElement, 'color', '#fff');
      // on change le boder
      this.render.setStyle(this.elementRef.nativeElement, 'boder', '2px solid grey');
    } else {
      // Si la reponse est correct, on change le background à vert
      this.render.setStyle(this.elementRef.nativeElement, 'background', 'red');
      // on change la couleur de text
      this.render.setStyle(this.elementRef.nativeElement, 'color', '#fff');
      // on change le boder
      this.render.setStyle(this.elementRef.nativeElement, 'boder', '2px solid grey');
    }
  }
}
