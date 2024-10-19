import { mockAllSecondaryIngredients } from "@/constants";
import IngredientCard from "../common/IngredientCard";
import { MdOutlineEgg } from "react-icons/md";
import CollapsiblePanel from "../common/CollapsiblePanel";

const AllSecondaryShoppingIngredients = () => {
	const ingredientCards = mockAllSecondaryIngredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.name}
				ingredient={ingredient}
				icon={<MdOutlineEgg />}
			/>
		);
	});

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
				{ingredientCards}
			</div>
		</CollapsiblePanel>
	);
};

export default AllSecondaryShoppingIngredients;
