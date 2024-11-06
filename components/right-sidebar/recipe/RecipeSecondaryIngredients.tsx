import { mockRecipeSecondaryIngredients } from "@/constants";
import RecipeIngredient from "./RecipeIngredient";
import CollapsiblePanel from "@/components/common/CollapsiblePanel";

const RecipeSecondaryIngredients = () => {
	const SecondaryIngredients = mockRecipeSecondaryIngredients.map(
		(ingredient) => {
			return (
				<RecipeIngredient
					key={ingredient.name}
					recipeIngredient={ingredient}
				/>
			);
		}
	);

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			{SecondaryIngredients}
		</CollapsiblePanel>
	);
};

export default RecipeSecondaryIngredients;
