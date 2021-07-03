import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input()
   recipe: Recipe;
  constructor(private recService: RecipeService ,
    private route : ActivatedRoute , private router: Router) {}
     id : number;

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.recipe = this.recService.getRecipie(this.id);
      }
    )
  }
  onDeleteRecipe(){
    this.recService.deleteRecipe(this.id);
    this.router.navigate(['../' , {relativeTo : this.route}])

  }
  onAddToShoppingList() {
    this.recService.addIngredientsToSL(this.recipe.ingredients);
    alert('your Ingredients have been sent to your Shopping List');
  }
  onEditRecipe(){
    this.router.navigate([`edit`] , {relativeTo : this.route})
  }

}
