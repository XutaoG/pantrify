import SearchBar from "../common/SearchBar";
import RecipeFilterDropdown from "../my-recipes/RecipeFilterDropdown";
import AllPrimaryShoppingIngredients from "./AllPrimaryShoppingIngredients";
import AllSecondaryShoppingIngredients from "./AllSecondaryShoppingIngredients";

const AllShoppingIngredients = () => {
	return (
		<section className="flex flex-col gap-6">
			<div className="flex gap-6">
				<SearchBar placeholderText="Search for a ingredient" />
				<RecipeFilterDropdown />
			</div>
			{/* All ingredients */}
			<AllPrimaryShoppingIngredients />
			<AllSecondaryShoppingIngredients />
		</section>
	);
};

export default AllShoppingIngredients;
