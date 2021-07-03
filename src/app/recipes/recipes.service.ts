import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingLIstService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'The Test Recipe',
      'Recipe Description',
      'https://post.greatist.com/wp-content/uploads/sites/2/2020/08/186195-grt-21-of-the-Freshest-Crepe-Recipes-You%E2%80%99ll-Regret-Not-Trying-732x549-Feature.jpg',
      [new Ingredient('Grape', 2), new Ingredient('FrenchFries', 3)]
    ),
    new Recipe(
      'The Test Recipe - 2',
      'Recipe - 2 Description',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYO_K4PJxmNkfQfxGHfBqP_MIWdlFlR0ylMw&usqp=CAU',
      [new Ingredient('Meat', 1), new Ingredient('Nachos', 2)]
    ),
  ];

  constructor(private slService: ShoppingLIstService) {}
  getRecipies() {
    return this.recipes.slice();
  }
  getRecipie(index : number) {
    return this.recipes[index];
  }

  addIngredientsToSL(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number , newRecipe : Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index : number){
    this.recipes.splice(index ,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
