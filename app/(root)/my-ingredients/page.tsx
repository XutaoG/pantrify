"use client";

import PageTitle from "@/components/common/PageTitle";
import AddIngredientController from "@/components/my-ingredients/AddIngredientController";
import AllIngredients from "@/components/my-ingredients/AllIngredients";

const MyIngredients = () => {
	return (
		// <FetchContext.Provider value={fetchIngredients}>
		<div className="grow flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
			{/* Page title */}
			<PageTitle
				title="My Ingredients"
				subtitle="Organize, Manage, and Create with What You Have."
			/>

			<AddIngredientController />

			{/* All ingredients */}
			<section className="flex flex-col gap-6">
				{/* Primary ingredients */}
				<AllIngredients
					ingredientType="Primary"
					isAvailable={true}
					isInCart={false}
					pageSize={12}
					noIngredientMessage="No ingredients yet! Add your first to begin building your collection."
				/>

				{/* Secondary ingredients */}
				<AllIngredients
					ingredientType="Secondary"
					isAvailable={true}
					isInCart={false}
					pageSize={12}
					noIngredientMessage="No ingredients yet! Add your first to begin building your collection."
				/>
			</section>
		</div>
	);
};

export default MyIngredients;
