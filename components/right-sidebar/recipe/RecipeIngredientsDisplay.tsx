import CollapsiblePanel from "../../common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";
import { RecipeIngredientAvailability } from "@/types";

interface RecipeIngredientsDisplayProps {
	ingredientType: "Primary" | "Secondary" | "Optional";
	ingredientAvailability: RecipeIngredientAvailability[];
}

const RecipeIngredientsDisplay = ({
	ingredientType,
	ingredientAvailability,
}: RecipeIngredientsDisplayProps) => {
	const recipeIngredients = ingredientAvailability.filter((ingredient) => {
		return ingredient.ingredientType === ingredientType;
	});

	const renderedRecipeIngredients = recipeIngredients.map((ingredient) => {
		return <RecipeIngredientListing key={ingredient.id} recipeIngredient={ingredient} />;
	});

	if (renderedRecipeIngredients.length === 0) {
		return null;
	}

	const title =
		ingredientType === "Primary"
			? "Primary Ingredients"
			: ingredientType === "Secondary"
			? "Secondary Ingredients"
			: "Optional Ingredients";

	return (
		<CollapsiblePanel title={title}>
			<div className="flex flex-col gap-1 sm:gap-2">{renderedRecipeIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipeIngredientsDisplay;
