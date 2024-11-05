import AllIngredients from "@/components/my-ingredients/AllIngredients";

const MyIngredients = () => {
	return (
		<div className="flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
			{/* Page title */}
			<div className="flex flex-col gap-2">
				<h2 className="font-semibold text-sky-600">My Ingredients</h2>
				<p className="text-neutral-600 font-medium">
					Organize, Manage, and Create with What You Have.
				</p>
			</div>

			{/* All ingredients */}
			<AllIngredients />
		</div>
	);
};

export default MyIngredients;
