import { mockRecipeSecondaryIngredients } from "@/constants";
import CollapsiblePanel from "../common/CollapsiblePanel";
import Ingredient from "./Ingredient";

const SecondaryIngredients = () => {
	const SecondaryIngredients = mockRecipeSecondaryIngredients.map(
		(ingredient) => {
			return <Ingredient key={ingredient.name} ingredient={ingredient} />;
		}
	);

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			{SecondaryIngredients}
		</CollapsiblePanel>
	);
};

export default SecondaryIngredients;
