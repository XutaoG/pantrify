import IngredientCard from "../common/IngredientCard";
import { MdOutlineEgg } from "react-icons/md";
import CollapsiblePanel from "../common/CollapsiblePanel";
import { getAllIngredients } from "@/api";

const AllSecondaryShoppingIngredients = async () => {
	const secondaryIngredients = await getAllIngredients({
		ingredientType: "Secondary",
		isInCart: true,
	});

	const secondaryIngredientCards = secondaryIngredients?.ingredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.id}
				ingredient={ingredient}
				icon={<MdOutlineEgg />}
				mode="shopping"
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
