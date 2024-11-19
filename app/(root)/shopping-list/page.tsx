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
			<div className="flex flex-col gap-2">
				<h2 className="font-semibold text-sky-600">Shopping List</h2>
				<p className="text-neutral-600 font-medium">Everything You Need, All in One Page.</p>
			</div>

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
