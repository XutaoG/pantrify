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
import { useBreakpointWidthCheck } from "@/hooks";
import { CircleX } from "lucide-react";

const RightSideBar = () => {
	const { activeView, setActiveView } = useContext(ActiveViewContext)!;
	const { refreshValue } = useContext(RefreshContext)!;

	// Actual view for display
	const [view, setView] = useState<Ingredient | Recipe | null>(null);

	// View size
	const isLargeView = useBreakpointWidthCheck(1024);

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
	}, [activeView, refreshValue, isLargeView]);

	const closeView = () => {
		setActiveView(null);
		setView(null);
	};

	if (!isLargeView && view == null) {
		return null;
	}

	return (
		<section
			className={`flex ${
				isLargeView
					? "p-4 pl-0"
					: "absolute inset-0 bg-black/40 border-l border-l-neutral-200"
			}`}
		>
			<div className="w-full flex justify-end">
				<div
					className={`flex flex-col gap-6 w-[400px] min-w-[300px] py-4 pl-4 pr-2 sm:p-4 card-container 
				 	min-h-0 ${isLargeView ? "rounded-xl" : "rounded-none"}`}
				>
					{/* Close button */}
					{isLargeView || (
						<button
							type="button"
							className="self-center bg-neutral-400 rounded-full 
										flex justify-center items-center gap-2 p-1 px-1.5 pr-2.5 hover:bg-neutral-500"
							onClick={closeView}
						>
							<CircleX color="white" />
							<p className="text-white font-semibold">Close</p>
						</button>
					)}

					<div className="grow flex flex-col pr-2 sm:pr-4 overflow-y-auto gap-2">
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
				</div>
			</div>
		</section>
	);
};

export default RightSideBar;
