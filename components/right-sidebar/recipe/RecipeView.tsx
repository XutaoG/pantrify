"use client";

import Image from "next/image";
import RecipeInfo from "./RecipeInfo";
import RecipeInstructions from "./RecipeInstructions";
import RecipePrimaryIngredients from "./RecipePrimaryIngredients";
import RecipeSecondaryIngredients from "./RecipeSecondaryIngredients";
import RecipeOptionalIngredients from "./RecipeOptionalIngredients";
import { Recipe, RecipeIngredientAvailability } from "@/types";
import { defaultRecipeImageRoute } from "@/constants";
import RecipeDescription from "./RecipeDescription";
import { Fragment, useEffect, useState } from "react";
import { getRecipeIngredientsAvailability } from "@/api";
import { LoaderCircle } from "lucide-react";

interface RecipeViewProps {
	recipe: Recipe;
}

const RecipeView = ({ recipe }: RecipeViewProps) => {
	const [isFetching, setIsFetching] = useState(false);
	const [ingredientAvailabilities, setIngredientAvailabilities] = useState<
		RecipeIngredientAvailability[]
	>([]);

	useEffect(() => {
		const fetchIngredientAvailabilities = async () => {
			setIsFetching(true);

			setIngredientAvailabilities(await getRecipeIngredientsAvailability(recipe.id));

			setIsFetching(false);
		};

		fetchIngredientAvailabilities();
	}, [recipe]);

	return (
		<section className="flex flex-col gap-6">
			{/* Recipe name */}
			<div className="flex flex-col">
				<p className="text-sm font-semibold text-neutral-600">Recipe name</p>
				<h3 className="font-medium tracking-wide">{recipe.name}</h3>
			</div>

			{/* Image */}
			<div className="h-60 w-full relative rounded-lg overflow-hidden">
				<Image
					src={
						recipe.images.length !== 0 ? recipe.images[0].path : defaultRecipeImageRoute
					}
					alt="recipe image"
					fill
					className="object-cover"
					sizes="33vw"
					priority
				/>
			</div>

			{/* Basic infos */}
			<RecipeInfo recipe={recipe} />

			{/* Description */}
			<RecipeDescription recipe={recipe} />

			{/* Ingredients */}
			{isFetching ? (
				<div className="flex justify-center items-center">
					<LoaderCircle className="animate-spin" />
				</div>
			) : (
				<Fragment>
					{/* Primary ingredients */}
					<RecipePrimaryIngredients ingredientAvailability={ingredientAvailabilities} />
					{/* Secondary ingredient */}
					<RecipeSecondaryIngredients ingredientAvailability={ingredientAvailabilities} />
					{/* Optional ingredients */}
					<RecipeOptionalIngredients ingredientAvailability={ingredientAvailabilities} />
				</Fragment>
			)}

			{/* Instructions */}
			<RecipeInstructions recipe={recipe} />
		</section>
	);
};

export default RecipeView;
