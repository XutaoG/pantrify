import IngredientAvailableRecipe from "./IngredientAvailableRecipe";
import IngredientInfo from "./IngredientInfo";

const IngredientView = () => {
	return (
		<section className="flex flex-col gap-6">
			{/* Ingredient name */}
			<h3 className="font-bold">Eggs</h3>

			{/* Basic info */}
			<IngredientInfo />

			{/* What you can make */}
			<IngredientAvailableRecipe />
		</section>
	);
};

export default IngredientView;
