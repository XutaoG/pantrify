import { Ingredient, Recipe } from "@/types";

// Asserts activeView is typed Ingredient
export const isIngredient = (activeView: Recipe | Ingredient): activeView is Ingredient => {
	return (<Ingredient>activeView).ingredientType !== undefined;
};

// Asserts activeView is typed Recipe
export const isRecipe = (activeView: Recipe | Ingredient): activeView is Recipe => {
	return (<Recipe>activeView).difficulty !== undefined;
};
