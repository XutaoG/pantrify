import Ingredient from "./Ingredient";
import { mockRecipePrimaryIngredients } from "@/constants";
import CollapsiblePanel from "../common/CollapsiblePanel";

const PrimaryIngredients = () => {
	const primaryIngredients = mockRecipePrimaryIngredients.map(
		(ingredient) => {
			return <Ingredient key={ingredient.name} ingredient={ingredient} />;
		}
	);

	return (
		<CollapsiblePanel title="Primary Ingredients">
			<div className="flex flex-col gap-3">{primaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default PrimaryIngredients;
