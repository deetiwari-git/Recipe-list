import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingLIstService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() itemName = new EventEmitter<string>();
  // @Output() itemAmount = new EventEmitter<number>();

  constructor(private slService: ShoppingLIstService) {}
    @ViewChild('f') slForm : NgForm;
    subscription : Subscription;
    editMode = false;
    editedItemIndex : number;
    editedItem : Ingredient;
  ngOnInit(): void {
   this.subscription =  this.slService.startedEditing.
   subscribe(
     (index: number)=>{
       this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name : this.editedItem.name ,
          amount : this.editedItem.amount
        })
      }
   );
  }

  onAddItem(form : NgForm) {
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(value.name , value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
      alert("Item Edited");
    }else{
      this.slService.addIngredient(newIngredient);
      alert("Item Added");
    }
    form.reset();
    this.editMode = false;
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }
  onDelete(){
    var r =   confirm("Sure to delete the ingredient?");
    if(r){this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

