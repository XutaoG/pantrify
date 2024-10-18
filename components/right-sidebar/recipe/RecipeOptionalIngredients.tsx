import { mockRecipeOptionalIngredients } from "@/constants";
import RecipeIngredient from "./RecipeIngredient";
import CollapsiblePanel from "@/components/common/CollapsiblePanel";

const RecipeOptionalIngredients = () => {
	const SecondaryIngredients = mockRecipeOptionalIngredients.map(
		(ingredient) => {
			return (
				<RecipeIngredient
					key={ingredient.name}
					ingredient={ingredient}
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

export default RecipeOptionalIngredients;
