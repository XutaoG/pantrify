import IngredientView from "@/components/right-sidebar/ingredient/IngredientView";
import RightSideBar from "@/components/right-sidebar/RightSideBar";
import AllShoppingIngredients from "@/components/shopping-list/AllShoppingIngredients";
import React from "react";

const ShoppingList = () => {
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
						Shopping List
					</h2>
					<p className="text-neutral-600 font-medium">
						Everything You Need, All in One Page.
					</p>
				</div>

				{/* All shopping ingredients */}
				<AllShoppingIngredients />
			</div>
			{/* Right sidebar */}
			<RightSideBar>
				<IngredientView />
			</RightSideBar>
		</main>
	);
};

export default ShoppingList;
