export interface Recipe {
	imageUrl: string;
	name: string;
	time: string;
	difficulty: string;
	numIngredients: number;
}

export interface LargeRecipeCardProps {
	recipe: Recipe;
}
