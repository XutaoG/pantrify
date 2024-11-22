import { mockRecipes2 } from "@/constants";
import SmallRecipeCard from "../common/SmallRecipeCard";
import SearchBar from "../common/SearchBar";
import RecipeFilterDropdown from "./RecipeFilterDropdown";
import RecipeSortDropdown from "./RecipeSortDropdown";

const AllRecipes = () => {
	const recipeCards = mockRecipes2.map((recipe) => {
		return <SmallRecipeCard recipe={recipe} key={recipe.name} />;
	});

	return (
		<section className="flex flex-col gap-4">
			<p className="font-medium">All Recipes</p>
			{/* Search bar + filter + sort */}
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<SearchBar placeholderText="Search for a recipe" />
					<RecipeFilterDropdown />
					<RecipeSortDropdown />
				</div>
				{/* All recipes */}
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">{recipeCards}</div>
			</div>
		</section>
	);
};

export default AllRecipes;
