import { Ingredient, Recipe } from "@/types";

// Asserts activeView is typed Ingredient
export const isIngredient = (activeView: Recipe | Ingredient): activeView is Ingredient => {
	return (<Ingredient>activeView).ingredientType !== undefined;
};

// Asserts activeView is typed Recipe
export const isRecipe = (activeView: Recipe | Ingredient): activeView is Recipe => {
	return (<Recipe>activeView).difficulty !== undefined;
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUSDate = (date: Date | null) => {
	//* Expiration date
	const expirationDate = date ? new Date(date ?? "") : null;
	const expirationDateStr = expirationDate
		? `${
				expirationDate.getMonth() + 1
		  }/${expirationDate.getDay()}/${expirationDate.getFullYear()}`
		: null;

	return expirationDateStr;
};

export const getTimeStr = (time: number) => {
	const hours = Math.floor(time / 60);
	const mins = time % 60;

	return `${hours}h ${mins}m`;
};
