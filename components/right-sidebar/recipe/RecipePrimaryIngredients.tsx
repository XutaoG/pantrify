import { mockRecipePrimaryIngredients } from "@/constants";
import CollapsiblePanel from "../../common/CollapsiblePanel";
import RecipeIngredient from "./RecipeIngredient";

const RecipePrimaryIngredients = () => {
	const primaryIngredients = mockRecipePrimaryIngredients.map(
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
		<CollapsiblePanel title="Primary Ingredients">
			<div className="flex flex-col gap-3">{primaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default RecipePrimaryIngredients;
