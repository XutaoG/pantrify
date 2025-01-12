import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";
import { RecipeIngredientAvailability } from "@/types";

interface RecipeSecondaryIngredientsProps {
	ingredientAvailability: RecipeIngredientAvailability[];
}

const RecipeSecondaryIngredients = ({
	ingredientAvailability,
}: RecipeSecondaryIngredientsProps) => {
	const secondaryIngredients = ingredientAvailability.filter((ingredient) => {
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
			<div className="flex flex-col gap-1 sm:gap-2">{renderedSecondaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipeSecondaryIngredients;
