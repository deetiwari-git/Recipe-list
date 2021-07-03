import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingLIstService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit ,OnDestroy {
  private igChangeSub : Subscription;
  ingName: string;
  ingAmount: number;
  ingredients: Ingredient[];
  constructor(private slService: ShoppingLIstService) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
   this.igChangeSub =  this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
  onEditItem(index:number){
        this.slService.startedEditing.next(index);
  }
  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }
}
