import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipes.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  // @Input() recipeItem: Recipe[];
  @Input() recipe: Recipe;
  @Input() index : number;
  constructor(private recipeSer: RecipeService) {}

  ngOnInit(): void {}

  // onSelected() {
  //   this.recipeSer.recipeSelected.emit(this.recipe);

  // }
}
