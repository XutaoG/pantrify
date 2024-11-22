import CollapsiblePanel from "@/components/common/CollapsiblePanel";
import LargeRecipeCard from "@/components/common/LargeRecipeCard";
import { mockEggRecipes } from "@/constants";

const IngredientAvailableRecipe = () => {
	const recipes = mockEggRecipes.map((recipe) => {
		return <LargeRecipeCard key={recipe.name} recipe={recipe} />;
	});

	return (
		<CollapsiblePanel title={'What You Can Make with "Eggs" '}>
			<div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-stretch gap-9">
				{recipes}
			</div>
		</CollapsiblePanel>
	);
};

export default IngredientAvailableRecipe;
