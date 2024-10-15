import { mockOptionalIngredients } from "@/constants";
import CollapsiblePanel from "../common/CollapsiblePanel";
import Ingredient from "./Ingredient";

const OptionalIngredients = () => {
	const SecondaryIngredients = mockOptionalIngredients.map((ingredient) => {
		return <Ingredient key={ingredient.name} ingredient={ingredient} />;
	});

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			{SecondaryIngredients}
		</CollapsiblePanel>
	);
};

export default OptionalIngredients;
