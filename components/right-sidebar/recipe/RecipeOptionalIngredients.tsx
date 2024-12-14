import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";
import { Recipe } from "@/types";

interface RecipeOptionalIngredientsProps {
	recipe: Recipe;
}

const RecipeOptionalIngredients = ({ recipe }: RecipeOptionalIngredientsProps) => {
	const optionalIngredients = recipe.ingredients.filter((ingredient) => {
		return ingredient.ingredientType === "Optional";
	});

	const renderedOptionalIngredients = optionalIngredients.map((ingredient) => {
		if (ingredient.ingredientType === "Optional") {
			return <RecipeIngredientListing key={ingredient.name} recipeIngredient={ingredient} />;
		}
	});

	if (renderedOptionalIngredients.length === 0) {
		return null;
	}

	return (
		<CollapsiblePanel title="Optional Ingredients">
			<div className="flex flex-col gap-2">{renderedOptionalIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipeOptionalIngredients;
