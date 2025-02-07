import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[libContenteditableDirectiveTs]',
  standalone: true
})
export class ContenteditableDirectiveTsDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    localStorage.setItem('editorContent', this.el.nativeElement.innerHTML);
  }

}
