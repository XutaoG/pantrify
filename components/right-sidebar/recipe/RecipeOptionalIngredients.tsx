import { mockRecipeOptionalIngredients } from "@/constants";
import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import RecipeIngredientListing from "./RecipeIngredientListing";

const RecipeOptionalIngredients = () => {
	const SecondaryIngredients = mockRecipeOptionalIngredients.map((ingredient) => {
		return <RecipeIngredientListing key={ingredient.name} recipeIngredient={ingredient} />;
	});

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			<div className="flex flex-col gap-2">{SecondaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipeOptionalIngredients;
