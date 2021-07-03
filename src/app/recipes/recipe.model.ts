import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public recipeImage: string;
  public ingredients: Ingredient[];
  constructor(
    name: string,
    description: string,
    recipeImage: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = description;
    this.recipeImage = recipeImage;
    this.ingredients = ingredients;
  }
}
