import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingLIstService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 7),
  ];

  getIngredients() {
    return this.ingredients.slice();
    //     return this.ingredients;
  }
  getIngredient(index: number){
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index : number , newIngredient : Ingredient){
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ing of ingredients) {
    //   this.addIngredient(ing);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  deleteIngredient(index : number){
    this.ingredients.splice(index ,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
