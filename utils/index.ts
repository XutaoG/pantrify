import {
	AddRecipeDto,
	Ingredient,
	Recipe,
	RecipeIngredient,
	RecipeIngredientAvailability,
	RecipeIngredientObj,
	UpdateRecipeDto,
} from "@/types";

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

	if (hours === 0) {
		return `${mins}m`;
	} else if (mins === 0) {
		return `${hours}h`;
	}

	return `${hours}h ${mins}m`;
};

export const getHourFromTime = (time: number) => {
	return Math.floor(time / 60);
};

export const getMinuteFromTime = (time: number) => {
	return time % 60;
};

export const getPluralEnding = (count: number, ending?: string) => {
	if (count === 1) {
		return;
	}

	if (ending != null && count !== 1) {
		return ending;
	}

	if (count !== 1) {
		return "s";
	}
};

export const getDifficulty = (difficulty: number) => {
	if (difficulty === 1) {
		return "Easy";
	} else if (difficulty === 2) {
		return "Medium";
	} else {
		return "Hard";
	}
};

export const packageRecipeToFormData = (recipe: AddRecipeDto | UpdateRecipeDto): FormData => {
	const formData = new FormData();

	//* Name
	formData.append("name", recipe.name);

	//* Description
	if (recipe.description) {
		formData.append("description", recipe.description);
	}

	//* Duration
	formData.append("duration", recipe.duration.toString());

	//* Difficulty
	formData.append("difficulty", recipe.difficulty.toString());

	//* NumServings
	formData.append("numServings", recipe.numServings.toString());

	//* Ingredients
	recipe.ingredients.forEach((ingredient, index) => {
		formData.append(`ingredients[${index}].name`, ingredient.name);
		formData.append(`ingredients[${index}].ingredientType`, ingredient.ingredientType);

		if (ingredient.quantityWhole) {
			formData.append(
				`ingredients[${index}].quantityWhole`,
				ingredient.quantityWhole.toString()
			);
		}

		if (ingredient.quantityFraction) {
			formData.append(`ingredients[${index}].quantityFraction`, ingredient.quantityFraction);
		}

		if (ingredient.quantityUnit) {
			formData.append(`ingredients[${index}].quantityUnit`, ingredient.quantityUnit);
		}
	});

	//* Instructions
	recipe.instructions.forEach((instruction) => {
		formData.append("instructions", instruction);
	});

	//* Images
	recipe.images.forEach((image) => {
		formData.append("images", image);
	});

	return formData;
};

export const convertImageURLtoFile = async (url: string) => {
	const response = await (await fetch(url)).blob();

	return new File([response], "image.png", { type: response.type });
};

export const getQuantityStr = (
	ingredient: RecipeIngredientObj | RecipeIngredient | RecipeIngredientAvailability
) => {
	const invalidQuantity =
		(ingredient.quantityWhole == "" || ingredient.quantityWhole == null) &&
		(ingredient.quantityFraction == "None" ||
			ingredient.quantityFraction == "" ||
			ingredient.quantityFraction == null) &&
		(ingredient.quantityFraction == "None" ||
			ingredient.quantityFraction == "" ||
			ingredient.quantityFraction == null);

	if (invalidQuantity) {
		return null;
	} else {
		return `${
			ingredient.quantityWhole !== 0 && ingredient.quantityWhole != null
				? ingredient.quantityWhole
				: ""
		} ${
			ingredient.quantityFraction !== "None" && ingredient.quantityFraction != null
				? ingredient.quantityFraction
				: ""
		} ${
			ingredient.quantityUnit !== "None" && ingredient.quantityUnit != null
				? ingredient.quantityUnit
				: ""
		}`;
	}
};
