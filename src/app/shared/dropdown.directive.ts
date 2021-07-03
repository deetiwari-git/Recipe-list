import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') clicked: boolean = false;
  constructor(private elRef: ElementRef) {}
  @HostListener('click') click() {
    this.clicked = !this.clicked;
  }
}
