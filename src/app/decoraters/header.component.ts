import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'decorate-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class Header {
  constructor(){}
  // @Output('callRecipe') recipe = new EventEmitter<string>();
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(value:string) {
  //   this.featureSelected.emit(value);
  // }
}
