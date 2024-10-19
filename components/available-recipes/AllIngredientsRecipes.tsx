import { mockAllIngredientsRecipes } from "@/constants";
import CollapsiblePanel from "../common/CollapsiblePanel";
import SmallRecipeCard from "../common/SmallRecipeCard";

const AllIngredientsRecipes = () => {
	const recipeCards = mockAllIngredientsRecipes.map((recipe) => {
		return <SmallRecipeCard key={recipe.name} recipe={recipe} />;
	});

	return (
		<CollapsiblePanel
			title="All Ingredients Present"
			titleStyle="text-emerald-500"
		>
			<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
				{recipeCards}
			</div>
		</CollapsiblePanel>
	);
};

export default AllIngredientsRecipes;
