import { mockRecipeSecondaryIngredients } from "@/constants";
import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";

const RecipeSecondaryIngredients = () => {
	const SecondaryIngredients = mockRecipeSecondaryIngredients.map((ingredient) => {
		return <RecipeIngredientListing key={ingredient.name} recipeIngredient={ingredient} />;
	});

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			<div className="flex flex-col gap-2">{SecondaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipeSecondaryIngredients;
