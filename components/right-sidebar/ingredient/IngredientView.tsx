import IngredientAvailableRecipe from "./IngredientAvailableRecipe";
import IngredientInfo from "./IngredientInfo";

const IngredientView = () => {
	return (
		<section>
			{/* Info */}
			<div className="p-5 flex flex-col gap-6">
				{/* Ingredient name */}
				<h3 className="font-bold ">Eggs</h3>
				{/* Basic info */}
				<IngredientInfo />
				{/* What you can make */}
				<IngredientAvailableRecipe />
			</div>
		</section>
	);
};

export default IngredientView;
