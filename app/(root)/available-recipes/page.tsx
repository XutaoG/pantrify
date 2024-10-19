import AllIngredientsRecipes from "@/components/available-recipes/AllIngredientsRecipes";
import MissingIngredientsRecipe from "@/components/available-recipes/MissingIngredientsRecipe";
import SomeIngredientsRecipes from "@/components/available-recipes/SomeIngredientsRecipes";
import Dropdown from "@/components/common/Dropdown";
import SearchBar from "@/components/common/SearchBar";
import RecipeView from "@/components/right-sidebar/recipe/RecipeView";
import RightSideBar from "@/components/right-sidebar/RightSideBar";

const AvailableRecipes = () => {
	return (
		<main className="grow flex min-w-0">
			{/* Main content */}
			<div
				className="flex flex-col gap-6 px-7 pt-12 pb-7
				grow my-1 mr-1 overflow-y-scroll"
			>
				{/* Page title */}
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-sky-600">
						Available Recipes
					</h2>
					<p className="text-neutral-600 font-medium">
						What{"'"}s in Your Kitchen, What{"'"}s on Your Plate.
					</p>
				</div>

				{/* Search bar + filter + sort */}
				<div className="flex flex-col gap-4">
					<div className="flex gap-6">
						<SearchBar placeholderText="Search for a recipe" />
						<Dropdown />
					</div>
				</div>

				{/* All ingredients recipes */}
				<AllIngredientsRecipes />

				{/* Some ingredients recipes */}
				<SomeIngredientsRecipes />

				{/* Missing ingredients recipes */}
				<MissingIngredientsRecipe />
			</div>
			{/* Right sidebar */}
			<RightSideBar>
				<RecipeView />
			</RightSideBar>
		</main>
	);
};

export default AvailableRecipes;
