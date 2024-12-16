"use client";

import { Ingredient } from "@/types";
import IngredientAvailableRecipe from "./IngredientAvailableRecipe";
import IngredientInfo from "./IngredientInfo";

interface IngredientViewProps {
	ingredient: Ingredient;
}

const IngredientView = ({ ingredient }: IngredientViewProps) => {
	return (
		<section className="flex flex-col gap-6">
			{/* Ingredient name */}
			<div className="flex flex-col gap-1">
				<p className="text-sm font-semibold text-neutral-600">Ingredient name</p>
				<h3 className="font-medium tracking-wide">{ingredient.name}</h3>
			</div>

			{/* Basic info */}
			<IngredientInfo ingredient={ingredient} />

			{/* What you can make */}
			<IngredientAvailableRecipe ingredient={ingredient} />
		</section>
	);
};

export default IngredientView;
