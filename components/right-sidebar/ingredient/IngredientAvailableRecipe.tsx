import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import { Ingredient } from "@/types";

interface IngredientAvailableRecipeProps {
	ingredient: Ingredient;
}

const IngredientAvailableRecipe = ({}: IngredientAvailableRecipeProps) => {
	return (
		<CollapsiblePanel title={'What You Can Make with "Eggs" '}>
			<div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-stretch gap-9">
				<p className="text-center font-medium">To be implemented</p>
			</div>
		</CollapsiblePanel>
	);
};

export default IngredientAvailableRecipe;
