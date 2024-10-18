import AllIngredients from "@/components/my-ingredients/AllIngredients";

const MyIngredients = () => {
	return (
		<main className="flex flex-col gap-6 px-7 pt-12 pb-7">
			{/* Page title */}
			<div className="flex flex-col gap-2">
				<h2 className="font-semibold text-sky-600">My Ingredients</h2>
				<p className="text-neutral-600 font-medium">
					Organize, Manage, and Create with What You Have.
				</p>
			</div>

			{/* All ingredients */}
			<AllIngredients />
		</main>
	);
};

export default MyIngredients;
