import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";
import { Egg } from "lucide-react";
import { AllPrimaryIngredientsProps } from "@/types";

const AllPrimaryIngredients = ({ ingredients }: AllPrimaryIngredientsProps) => {
	const primaryIngredientCards = ingredients?.ingredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.id}
				ingredient={ingredient}
				icon={<Egg size={20} />}
				mode="ingredient"
			/>
		);
	});

	return (
		<CollapsiblePanel title="Primary Ingredients">
			{primaryIngredientCards?.length != 0 ? (
				// Primary ingredient cards
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
					{primaryIngredientCards}
				</div>
			) : (
				<div className="h-16 flex justify-center items-center">
					<p className="font-medium italic">
						No ingredients yet! Add your first to begin building your collection.
					</p>
				</div>
			)}
		</CollapsiblePanel>
	);
};

export default AllPrimaryIngredients;
