import AllShoppingIngredients from "@/components/shopping-list/AllShoppingIngredients";
import React from "react";

const ShoppingList = async () => {
	setTimeout(() => {}, 5000);

	return (
		<div className="flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
			{/* Page title */}
			<div className="flex flex-col gap-2">
				<h2 className="font-semibold text-sky-600">Shopping List</h2>
				<p className="text-neutral-600 font-medium">
					Everything You Need, All in One Page.
				</p>
			</div>

			{/* All shopping ingredients */}
			<AllShoppingIngredients />
		</div>
	);
};

export default ShoppingList;
