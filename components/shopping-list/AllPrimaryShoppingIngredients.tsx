import { getAllIngredients } from "@/api";
import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";
import { Egg } from "lucide-react";

const AllPrimaryShoppingIngredients = async () => {
	const primaryIngredients = await getAllIngredients({
		ingredientType: "Primary",
		isInCart: true,
	});

	const primaryIngredientCards = primaryIngredients?.ingredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.id}
				ingredient={ingredient}
				icon={<Egg size={20} />}
				mode="shopping"
			/>
		);
	});

	return (
		<CollapsiblePanel title="Primary Ingredients List">
			{primaryIngredientCards?.length != 0 ? (
				// Primary ingredient cards
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
					{primaryIngredientCards}
				</div>
			) : (
				<div className="h-16 flex justify-center items-center">
					<p className="font-medium italic">
						Your grocery list is empty! Add items to make your next shopping trip a
						breeze.
					</p>
				</div>
			)}
		</CollapsiblePanel>
	);
};

export default AllPrimaryShoppingIngredients;
