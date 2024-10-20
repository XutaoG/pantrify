import AllIngredientsRecipes from "@/components/available-recipes/AllIngredientsRecipes";
import MissingIngredientsRecipe from "@/components/available-recipes/MissingIngredientsRecipe";
import SomeIngredientsRecipes from "@/components/available-recipes/SomeIngredientsRecipes";
import Dropdown from "@/components/common/Dropdown";
import SearchBar from "@/components/common/SearchBar";

const AvailableRecipes = () => {
	return (
		<div className="flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-scroll">
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
	);
};

export default AvailableRecipes;
