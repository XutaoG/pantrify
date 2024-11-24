"use client";

import { useContext } from "react";
import { ActiveViewContext } from "../common/ActiveViewContext";
import { isIngredient, isRecipe } from "@/utils";
import IngredientView from "./ingredient/IngredientView";
import RecipeView from "./recipe/RecipeView";

const RightSideBar = () => {
	const view = useContext(ActiveViewContext);

	const { activeView } = view!;

	return (
		<section
			className="flex flex-col w-[450px] min-w-[450px] p-4 card-container 
			shadow-sm rounded-xl min-h-0"
		>
			<div className="grow flex flex-col pr-4 overflow-y-auto">
				{/* No view */}
				{activeView == null && (
					<div className="grow flex justify-center items-center">
						<p className="font-medium text-neutral-600 italic">
							Select a Recipe or Ingredient to View!
						</p>
					</div>
				)}
				{/* Ingredient view */}
				{activeView != null && isIngredient(activeView) && (
					<IngredientView ingredient={activeView} />
				)}
				{/* Recipe view */}
				{activeView != null && isRecipe(activeView) && <RecipeView recipe={activeView} />}
			</div>
		</section>
	);
};

export default RightSideBar;
