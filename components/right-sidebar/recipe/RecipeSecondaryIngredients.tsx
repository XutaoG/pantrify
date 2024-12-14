import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";
import { Recipe } from "@/types";

interface RecipeSecondaryIngredientsProps {
	recipe: Recipe;
}

const RecipeSecondaryIngredients = ({ recipe }: RecipeSecondaryIngredientsProps) => {
	const secondaryIngredients = recipe.ingredients.filter((ingredient) => {
		return ingredient.ingredientType === "Secondary";
	});

	const renderedSecondaryIngredients = secondaryIngredients.map((ingredient) => {
		if (ingredient.ingredientType === "Secondary") {
			return <RecipeIngredientListing key={ingredient.id} recipeIngredient={ingredient} />;
		}
	});

	if (renderedSecondaryIngredients.length === 0) {
		return null;
	}

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			<div className="flex flex-col gap-2">{renderedSecondaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipeSecondaryIngredients;
