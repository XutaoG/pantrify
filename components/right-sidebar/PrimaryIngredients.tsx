import Ingredient from "./Ingredient";
import { mockPrimaryIngredients } from "@/constants";
import CollapsiblePanel from "../common/CollapsiblePanel";

const PrimaryIngredients = () => {
	const primaryIngredients = mockPrimaryIngredients.map((ingredient) => {
		return (
			<Ingredient
				key={ingredient.name}
				name={ingredient.name}
				amount={ingredient.amount}
				isAvailable={ingredient.isAvailable}
			/>
		);
	});

	return (
		<CollapsiblePanel title="Primary Ingredients">
			<div className="flex flex-col gap-3">{primaryIngredients}</div>
		</CollapsiblePanel>
	);
};

export default PrimaryIngredients;
