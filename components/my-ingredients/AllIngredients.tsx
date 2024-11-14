import SearchBar from "../common/SearchBar";
import RecipeFilterDropdown from "../my-recipes/RecipeFilterDropdown";
import AllPrimaryIngredients from "./AllPrimaryIngredients";
import AllSecondaryIngredients from "./AllSecondaryIngredients";

const AllIngredients = () => {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex gap-6">
				<SearchBar placeholderText="Search for a ingredient" />
				<RecipeFilterDropdown />
			</div>
			{/* All ingredients */}
			<AllPrimaryIngredients />
			<AllSecondaryIngredients />
		</section>
	);
};

export default AllIngredients;
