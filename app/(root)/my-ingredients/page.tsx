"use client";

import { RefreshContext } from "@/components/common/FetchContext";
import PageTitle from "@/components/common/PageTitle";
import AddIngredientController from "@/components/ingredients/AddIngredientController";
import AllIngredients from "@/components/ingredients/AllIngredients";
import { useContext } from "react";

const MyIngredients = () => {
	//* refreshValue: passed to useIngredients dependency array to retrieve ingredients
	const { refreshValue } = useContext(RefreshContext)!;

	return (
		<div className="grow flex flex-col gap-4 sm:gap-6 p-1 sm:p-4 sm:py-2 overflow-y-auto">
			{/* Page title */}
			<PageTitle
				title="My Ingredients"
				subtitle="Organize, Manage, and Create with What You Have."
			/>

			{/* Add ingredient */}
			<AddIngredientController mode="ingredient" />

			{/* All ingredients */}
			<section className="flex flex-col gap-4 sm:gap-6">
				{/* Primary ingredients */}
				<AllIngredients
					ingredientType="Primary"
					isAvailable={true}
					pageSize={12}
					noIngredientMessage="No ingredients yet! Add your first to begin building your collection."
					refreshValue={refreshValue}
				/>

				{/* Secondary ingredients */}
				<AllIngredients
					ingredientType="Secondary"
					isAvailable={true}
					pageSize={12}
					noIngredientMessage="No ingredients yet! Add your first to begin building your collection."
					refreshValue={refreshValue}
				/>
			</section>
		</div>
	);
};

export default MyIngredients;
