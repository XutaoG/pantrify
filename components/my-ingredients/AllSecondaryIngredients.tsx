import { mockAllSecondaryIngredients } from "@/constants";
import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";

const AllSecondaryIngredients = () => {
	const ingredientCards = mockAllSecondaryIngredients.map((ingredient) => {
		return <IngredientCard key={ingredient.name} ingredient={ingredient} />;
	});

	return (
		<CollapsiblePanel title="Primary Ingredients">
			<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
				{ingredientCards}
			</div>
		</CollapsiblePanel>
	);
};

export default AllSecondaryIngredients;
