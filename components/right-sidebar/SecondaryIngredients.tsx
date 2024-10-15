import { mockSecondaryIngredients } from "@/constants";
import CollapsiblePanel from "../common/CollapsiblePanel";
import Ingredient from "./Ingredient";

const SecondaryIngredients = () => {
	const SecondaryIngredients = mockSecondaryIngredients.map((ingredient) => {
		return <Ingredient key={ingredient.name} ingredient={ingredient} />;
	});

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			{SecondaryIngredients}
		</CollapsiblePanel>
	);
};

export default SecondaryIngredients;
