import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import AddIngredientController from "@/components/my-ingredients/AddIngredientController";
import AllPrimaryIngredients from "@/components/my-ingredients/AllPrimaryIngredients";
import AllSecondaryIngredients from "@/components/my-ingredients/AllSecondaryIngredients";
import RecipeFilterDropdown from "@/components/my-recipes/RecipeFilterDropdown";

const MyIngredients = () => {
	return (
		<div className="grow flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
			{/* Page title */}
			<PageTitle
				title="My Ingredients"
				subtitle="Organize, Manage, and Create with What You Have."
			/>

			<AddIngredientController />

			{/* All ingredients */}
			<section className="flex flex-col gap-6">
				<div className="flex gap-6">
					<SearchBar placeholderText="Search for a ingredient" />
					<RecipeFilterDropdown />
				</div>
				{/* All ingredients */}
				<AllPrimaryIngredients />
				<AllSecondaryIngredients />
			</section>
		</div>
	);
};

export default MyIngredients;
