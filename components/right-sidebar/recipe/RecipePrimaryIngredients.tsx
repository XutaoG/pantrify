import { mockRecipePrimaryIngredients } from "@/constants";
import CollapsiblePanel from "../../common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";

const RecipePrimaryIngredients = () => {
	const primaryIngredients = mockRecipePrimaryIngredients.map((ingredient) => {
		return <RecipeIngredientListing key={ingredient.name} recipeIngredient={ingredient} />;
	});

	return (
		<CollapsiblePanel title="Primary Ingredients">
			<div className="flex flex-col gap-2">{primaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipePrimaryIngredients;
