import { mockMissingIngredientsRecipes } from "@/constants";
import SmallRecipeCard from "../common/SmallRecipeCard";
import CollapsiblePanel from "../common/CollapsiblePanel";

const MissingIngredientsRecipe = () => {
	const recipeCards = mockMissingIngredientsRecipes.map((recipe) => {
		return <SmallRecipeCard key={recipe.name} recipe={recipe} />;
	});

	return (
		<CollapsiblePanel
			title="All Ingredients Present"
			titleStyle="text-red-500"
		>
			<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
				{recipeCards}
			</div>
		</CollapsiblePanel>
	);
};

export default MissingIngredientsRecipe;
