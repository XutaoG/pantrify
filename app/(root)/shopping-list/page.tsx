import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import RecipeFilterDropdown from "@/components/my-recipes/RecipeFilterDropdown";
import AddShoppingListcontroller from "@/components/shopping-list/AddShoppingListController";
import AllPrimaryShoppingIngredients from "@/components/shopping-list/AllPrimaryShoppingIngredients";
import AllSecondaryShoppingIngredients from "@/components/shopping-list/AllSecondaryShoppingIngredients";
import React from "react";

const ShoppingList = () => {
	return (
		<div className="grow flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
			{/* Page title */}
			<PageTitle title="Shopping List" subtitle="Everything You Need, All in One Page." />

			<AddShoppingListcontroller />

			{/* All shopping ingredients */}
			<section className="flex flex-col gap-6">
				<div className="flex gap-6">
					<SearchBar placeholderText="Search for a ingredient" />
					<RecipeFilterDropdown />
				</div>
				{/* All ingredients */}
				<AllPrimaryShoppingIngredients />
				<AllSecondaryShoppingIngredients />
			</section>
		</div>
	);
};

export default ShoppingList;
