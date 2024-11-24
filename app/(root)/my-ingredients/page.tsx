"use client";

import { RefreshContext } from "@/components/common/FetchContext";
import PageTitle from "@/components/common/PageTitle";
import AddIngredientController from "@/components/my-ingredients/AddIngredientController";
import AllIngredients from "@/components/my-ingredients/AllIngredients";
import { useState } from "react";

const MyIngredients = () => {
	//* refreshValue: passed to useIngredients dependency array to retrieve ingredients
	const [refreshValue, setRefreshValue] = useState(false);

	//* refresh: called when ingredients are updated and need to be reloaded
	const refresh = () => {
		setRefreshValue((val) => !val);
	};

	return (
		<RefreshContext.Provider value={{ refreshValue, refresh }}>
			<div className="grow flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
				{/* Page title */}
				<PageTitle
					title="My Ingredients"
					subtitle="Organize, Manage, and Create with What You Have."
				/>

				{/* Add ingredient */}
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
						refreshValue={refreshValue}
					/>

					{/* Secondary ingredients */}
					<AllIngredients
						ingredientType="Secondary"
						isAvailable={true}
						isInCart={false}
						pageSize={12}
						noIngredientMessage="No ingredients yet! Add your first to begin building your collection."
						refreshValue={refreshValue}
					/>
				</section>
			</div>
		</RefreshContext.Provider>
	);
};

export default MyIngredients;
