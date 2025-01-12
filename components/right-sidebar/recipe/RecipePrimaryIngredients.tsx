import CollapsiblePanel from "../../common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";
import { RecipeIngredientAvailability } from "@/types";

interface RecipePrimaryIngredientsProps {
	ingredientAvailability: RecipeIngredientAvailability[];
}

const RecipePrimaryIngredients = ({ ingredientAvailability }: RecipePrimaryIngredientsProps) => {
	const primaryIngredients = ingredientAvailability.filter((ingredient) => {
		return ingredient.ingredientType === "Primary";
	});

	const renderedPrimaryIngredients = primaryIngredients.map((ingredient) => {
		if (ingredient.ingredientType === "Primary") {
			return <RecipeIngredientListing key={ingredient.id} recipeIngredient={ingredient} />;
		}
	});

	if (renderedPrimaryIngredients.length === 0) {
		return null;
	}

	return (
		<CollapsiblePanel title="Primary Ingredients">
			<div className="flex flex-col gap-1 sm:gap-2">{renderedPrimaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipePrimaryIngredients;
