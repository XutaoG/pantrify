import { getAllIngredients } from "@/api";
import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";
import { MdOutlineEgg } from "react-icons/md";

const AllSecondaryIngredients = async () => {
	const secondaryIngredients = await getAllIngredients({ ingredientType: "Secondary" });

	const secondaryIngredientCards = secondaryIngredients?.ingredients.map((ingredient) => {
		return <IngredientCard key={ingredient.name} ingredient={ingredient} icon={<MdOutlineEgg />} />;
	});

	return (
		<CollapsiblePanel title="Secondary Ingredients">
			{secondaryIngredientCards?.length != 0 ? (
				// Secondary ingredient cards
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">{secondaryIngredientCards}</div>
			) : (
				<div className="h-16 flex justify-center items-center">
					<p className="font-medium italic">Your Seasoning Pantry is Empty! Let{"'"}s stock it up.</p>
				</div>
			)}
		</CollapsiblePanel>
	);
};

export default AllSecondaryIngredients;
