import { getAllIngredients } from "@/api";
import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";
import { MdOutlineEgg } from "react-icons/md";

const AllPrimaryIngredients = async () => {
	const primaryIngredients = await getAllIngredients({ ingredientType: "Primary" });

	const primaryIngredientCards = primaryIngredients?.ingredients.map((ingredient) => {
		return <IngredientCard key={ingredient.id} ingredient={ingredient} icon={<MdOutlineEgg />} />;
	});

	return (
		<CollapsiblePanel title="Primary Ingredients">
			{primaryIngredientCards?.length != 0 ? (
				// Primary ingredient cards
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">{primaryIngredientCards}</div>
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
