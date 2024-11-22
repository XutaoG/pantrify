import IngredientCard from "../common/IngredientCard";
import CollapsiblePanel from "../common/CollapsiblePanel";
import { Milk } from "lucide-react";
import { AllSecondaryIngredientsProps } from "@/types";

const AllSecondaryShoppingIngredients = ({ ingredients }: AllSecondaryIngredientsProps) => {
	const secondaryIngredientCards = ingredients?.ingredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.name}
				ingredient={ingredient}
				icon={<Milk size={20} />}
				mode="ingredient"
			/>
		);
	});

	return (
		secondaryIngredientCards?.length != 0 && (
			<CollapsiblePanel title="Secondary Ingredients List">
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
					{secondaryIngredientCards}
				</div>
			</CollapsiblePanel>
		)
	);
};

export default AllSecondaryShoppingIngredients;
