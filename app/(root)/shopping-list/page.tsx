"use client";

import { RefreshContext } from "@/components/common/FetchContext";
import PageTitle from "@/components/common/PageTitle";
import AddIngredientController from "@/components/ingredients/AddIngredientController";
import AllIngredients from "@/components/ingredients/AllIngredients";
import { useRefresh } from "@/hooks";

const ShoppingList = () => {
	//* refreshValue: passed to useIngredients dependency array to retrieve ingredients
	const [refreshValue, refresh] = useRefresh();

	return (
		<RefreshContext.Provider value={{ refreshValue, refresh }}>
			<div className="grow flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
				{/* Page title */}
				<PageTitle
					title="Shopping List"
					subtitle="Everything You Need to Buy, All in One Page."
				/>

				{/* Add shopping items */}
				<AddIngredientController mode="shopping" />

				{/* All ingredients */}
				<section className="flex flex-col gap-6">
					{/* Primary ingredients */}
					<AllIngredients
						ingredientType="Primary"
						isAvailable={false}
						isInCart={true}
						pageSize={12}
						noIngredientMessage="Nothing here yet! Start adding ingredients to plan your shopping."
						refreshValue={refreshValue}
					/>

					{/* Secondary ingredients */}
					<AllIngredients
						ingredientType="Secondary"
						isAvailable={false}
						isInCart={true}
						pageSize={12}
						noIngredientMessage="Nothing here yet! Start adding ingredients to plan your shopping."
						refreshValue={refreshValue}
					/>
				</section>
			</div>
		</RefreshContext.Provider>
	);
};

export default ShoppingList;
