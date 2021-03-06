import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Recipe 1','This is the recipe 1','http://lorempixel.com/output/food-q-c-640-480-7.jpg',[
      new Ingredient('Ingredient 1', 5),
      new Ingredient('Ingredient 2', 3),
      new Ingredient('Ingredient 3', 1),
      new Ingredient('Ingredient 4', 8)
    ]),
    new Recipe('Recipe 2','This is the recipe 2','http://lorempixel.com/output/food-q-c-640-480-2.jpg',[
      new Ingredient('Ingredient 5', 5),
      new Ingredient('Ingredient 6', 3),
      new Ingredient('Ingredient 7', 1),
      new Ingredient('Ingredient 8', 8)
    ]),
    new Recipe('Recipe 3','This is the recipe 3','http://lorempixel.com/output/food-q-c-640-480-5.jpg',[
      new Ingredient('Ingredient 9', 5),
      new Ingredient('Ingredient 10', 3),
      new Ingredient('Ingredient 11', 1),
      new Ingredient('Ingredient 12', 8)
    ])
  ];

  constructor (private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
