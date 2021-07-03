import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  // @ViewChild('textarea') text : HTMLElement;
  recipeForm : FormGroup;
  id : number;
  editMode : boolean = false;

  constructor(private route : Router,
    private router : ActivatedRoute ,
    private recipeService : RecipeService,) { }


  ngOnInit(): void {
    this.router.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    )
  }
  get controls() { // a getter!
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
}
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeNameDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      let recipe = this.recipeService.getRecipie(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.recipeImage;
      recipeNameDescription = recipe.description;
          if(recipe['ingredients']){
              for (let ingredient of recipe.ingredients) {
                recipeIngredients.push(
                  new FormGroup({
                    name : new FormControl(ingredient.name, Validators.required),
                    amount : new FormControl(ingredient.amount, [Validators.required , Validators.pattern(
                      "^[1-9]+[0-9]*$"
                    )]),
                  })
                );
              }
          }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName , Validators.required),
      'recipeImage' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeNameDescription , Validators.required),
      'ingredients' : recipeIngredients 
    })
  }

  onCancel(){
    this.route.navigate(['../'] , {relativeTo : this.router});
  }
  onSubmit(){
    console.log(this.recipeForm);  

    /*const newRecipe = new Recipe(this.recipeForm.value['name'],
    this.recipeForm.value['recipeDescription'],
    this.recipeForm.value['recipeImagePath'],
    this.recipeForm.value['ingredients'])*/
    
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id,newRecipe);
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name : new FormControl(null, Validators.required),
      amount : new FormControl(null, [Validators.required , Validators.pattern(
                      "^[1-9]+[0-9]*$"
                    )]),
    }))
  }
  onDeleteIngredient(index : number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
