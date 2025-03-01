"use client";

import { RefreshContext } from "@/components/common/FetchContext";
import PageTitle from "@/components/common/PageTitle";
import AddIngredientController from "@/components/ingredients/AddIngredientController";
import AllIngredients from "@/components/ingredients/AllIngredients";
import { useContext } from "react";

const ShoppingList = () => {
	//* refreshValue: passed to useIngredients dependency array to retrieve ingredients
	const { refreshValue } = useContext(RefreshContext)!;

	return (
		<div className="grow flex flex-col gap-4 sm:gap-6 p-1 sm:p-4 sm:py-2 overflow-y-auto">
			{/* Page title */}
			<PageTitle
				title="Shopping List"
				subtitle="Everything You Need to Buy, All in One Page."
			/>

			{/* Add shopping items */}
			<AddIngredientController mode="shopping" />

			{/* All ingredients */}
			<section className="flex flex-col gap-4 sm:gap-6">
				{/* Primary ingredients */}
				<AllIngredients
					ingredientType="Primary"
					isInCart={true}
					pageSize={12}
					noIngredientMessage="Nothing here yet! Start adding ingredients to plan your shopping."
					refreshValue={refreshValue}
				/>

				{/* Secondary ingredients */}
				<AllIngredients
					ingredientType="Secondary"
					isInCart={true}
					pageSize={12}
					noIngredientMessage="Nothing here yet! Start adding ingredients to plan your shopping."
					refreshValue={refreshValue}
				/>
			</section>
		</div>
	);
};

export default ShoppingList;
