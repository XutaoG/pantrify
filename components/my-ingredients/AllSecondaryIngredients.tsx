import { getAllIngredients } from "@/api";
import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";
import { MdOutlineEgg } from "react-icons/md";

const AllSecondaryIngredients = async () => {
	const secondaryIngredients = await getAllIngredients({ ingredientType: "Secondary" });

	const secondaryIngredientCards = secondaryIngredients?.ingredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.name}
				ingredient={ingredient}
				icon={<MdOutlineEgg />}
				mode="ingredient"
			/>
		);
	});

	return (
		secondaryIngredientCards?.length != 0 && (
			<CollapsiblePanel title="Secondary Ingredients">
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
					{secondaryIngredientCards}
				</div>
			</CollapsiblePanel>
		)
	);
};

export default AllSecondaryIngredients;
