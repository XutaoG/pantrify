import AllIngredientsRecipes from "@/components/available-recipes/AllIngredientsRecipes";
import MissingIngredientsRecipe from "@/components/available-recipes/MissingIngredientsRecipe";
import SomeIngredientsRecipes from "@/components/available-recipes/SomeIngredientsRecipes";
import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import RecipeFilterDropdown from "@/components/my-recipes/RecipeFilterDropdown";
import RecipeSortDropdown from "@/components/my-recipes/RecipeSortDropdown";

const AvailableRecipes = () => {
	return (
		<div className="grow flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
			{/* Page title */}
			<PageTitle
				title="Available Recipes"
				subtitle="What's in Your Kitchen, What's on Your Plate."
			/>

			{/* Search bar + filter + sort */}
			<div className="flex flex-col gap-4">
				<div className="flex gap-4">
					<SearchBar placeholderText="Search for a recipe" />
					<RecipeFilterDropdown />
					<RecipeSortDropdown />
				</div>
			</div>

			{/* All ingredients recipes */}
			<AllIngredientsRecipes />

			{/* Some ingredients recipes */}
			<SomeIngredientsRecipes />

			{/* Missing ingredients recipes */}
			<MissingIngredientsRecipe />
		</div>
	);
};

export default AvailableRecipes;
