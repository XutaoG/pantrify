import IngredientAvailableRecipe from "./IngredientAvailableRecipe";
import IngredientInfo from "./IngredientInfo";

const IngredientView = () => {
	return (
		<section className="flex flex-col gap-6">
			{/* Ingredient name */}
			<div className="flex flex-col gap-1">
				<p className="text-sm font-semibold text-neutral-600">Ingredient name</p>
				<h3 className="font-medium tracking-wide">Eggs</h3>
			</div>

			{/* Basic info */}
			<IngredientInfo />

			{/* What you can make */}
			<IngredientAvailableRecipe />
		</section>
	);
};

export default IngredientView;
