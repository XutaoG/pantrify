import AllIngredients from "@/components/my-ingredients/AllIngredients";
import IngredientView from "@/components/right-sidebar/ingredient/IngredientView";
import RightSideBar from "@/components/right-sidebar/RightSideBar";

const MyIngredients = () => {
	return (
		<main className="grow flex min-w-0">
			{/* Main content */}
			<div
				className="grow flex flex-col gap-6 px-7 pt-12 pb-7 
				my-1 mr-1 overflow-y-scroll"
			>
				{/* Page title */}
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-sky-600">
						My Ingredients
					</h2>
					<p className="text-neutral-600 font-medium">
						Organize, Manage, and Create with What You Have.
					</p>
				</div>

				{/* All ingredients */}
				<AllIngredients />
			</div>
			{/* Right sidebar */}
			<RightSideBar>
				<IngredientView />
			</RightSideBar>
		</main>
	);
};

export default MyIngredients;
