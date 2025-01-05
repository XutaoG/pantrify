import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";
import { RecipeIngredientAvailability } from "@/types";

interface RecipeOptionalIngredientsProps {
	ingredientAvailability: RecipeIngredientAvailability[];
}

const RecipeOptionalIngredients = ({ ingredientAvailability }: RecipeOptionalIngredientsProps) => {
	const optionalIngredients = ingredientAvailability.filter((ingredient) => {
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
