"use client";

import { useContext, useEffect, useState } from "react";
import { ActiveViewContext } from "../common/ActiveViewContext";
import { isIngredient, isRecipe } from "@/utils";
import IngredientView from "./ingredient/IngredientView";
import RecipeView from "./recipe/RecipeView";
import Image from "next/image";
import { RefreshContext } from "../common/FetchContext";
import { Ingredient, Recipe } from "@/types";
import { getIngredientApi, getRecipeApi } from "@/api";

const RightSideBar = () => {
	const { activeView } = useContext(ActiveViewContext)!;
	const { refreshValue } = useContext(RefreshContext)!;

	// Actual view for display
	const [view, setView] = useState<Ingredient | Recipe | null>(null);

	useEffect(() => {
		if (activeView == null) {
			return;
		}

		const setIngredient = async () => {
			setView(await getIngredientApi(activeView.id));
		};

		const setRecipe = async () => {
			setView(await getRecipeApi(activeView.id));
		};

		// Ingredient type
		if (isIngredient(activeView)) {
			setIngredient();
		}

		// Recipe type
		if (isRecipe(activeView)) {
			setRecipe();
		}
	}, [activeView, refreshValue]);

	return (
		<section
			className="flex flex-col w-[450px] min-w-[450px] p-4 card-container 
			rounded-xl min-h-0"
		>
			<div className="grow flex flex-col pr-4 overflow-y-auto">
				{/* No view */}
				{view == null && (
					<div className="grow flex flex-col gap-6 justify-center items-center">
						<Image
							src="/logo/pantrify_logo.webp"
							alt="logo"
							width={48}
							height={48}
							priority
						/>
						<p className="font-medium text-neutral-600 italic">
							Select a Recipe or Ingredient to View!
						</p>
					</div>
				)}
				{/* Ingredient view */}
				{view != null && isIngredient(view) && <IngredientView ingredient={view} />}

				{/* Recipe view */}
				{view != null && isRecipe(view) && <RecipeView recipe={view} />}
			</div>
		</section>
	);
};

export default RightSideBar;
