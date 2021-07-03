import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { count } from 'console';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit , OnDestroy {
  // count = 0;
  // recipeName: string;
  // recipeDescription: string;
  // recipeImage: string;
  recipes: Recipe[];
  subscription : Subscription;

  constructor(private recipeSer: RecipeService , private router : Router , private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.subscription = this.recipeSer.recipesChanged.subscribe(
      (recipe : Recipe[]) => {
          this.recipes = recipe;
      }
    );
    this.recipes = this.recipeSer.getRecipies();
  }
  
  onNewRecipe(){
    this.router.navigate(['new'] , {relativeTo : this.route});
  }
  ngOnDestroy(){
  this.subscription.unsubscribe();
  }
}
