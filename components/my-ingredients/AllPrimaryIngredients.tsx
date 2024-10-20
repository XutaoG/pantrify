import { mockAllPrimaryIngredients } from "@/constants";
import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";
import { MdOutlineEgg } from "react-icons/md";

const AllPrimaryIngredients = () => {
	const ingredientCards = mockAllPrimaryIngredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.name}
				ingredient={ingredient}
				icon={<MdOutlineEgg />}
			/>
		);
	});

	return (
		<CollapsiblePanel title="Primary Ingredients">
			<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
				{ingredientCards}
			</div>
		</CollapsiblePanel>
	);
};

export default AllPrimaryIngredients;
