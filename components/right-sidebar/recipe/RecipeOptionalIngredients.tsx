import { mockRecipeOptionalIngredients } from "@/constants";
import RecipeIngredient from "./RecipeIngredient";
import CollapsiblePanel from "@/components/common/CollapsiblePanel";

const RecipeOptionalIngredients = () => {
	const SecondaryIngredients = mockRecipeOptionalIngredients.map((ingredient) => {
		return <RecipeIngredient key={ingredient.name} recipeIngredient={ingredient} />;
	});

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			<div className="flex flex-col py-2 gap-2">{SecondaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipeOptionalIngredients;
