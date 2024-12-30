"use client";

import { getAllIngredients, getAllRecipes } from "@/api";
import { getPluralEnding } from "@/utils";
import { LoaderCircle } from "lucide-react";
// import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

const Overview = () => {
	// Count
	const [recentRecipeCount, setRecentRecipeCount] = useState<number | null>(null);
	const [recentIngredientCount, setRecentIngredientCount] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchRecipes = async () => {
			setIsLoading(true);

			const recipeCount = (await getAllRecipes())?.totalCount;
			const ingredientCount = (await getAllIngredients())?.totalCount;

			setRecentRecipeCount(recipeCount ?? null);
			setRecentIngredientCount(ingredientCount ?? null);

			setIsLoading(false);
		};

		fetchRecipes();
	}, []);

	return (
		<section className="flex card-container rounded-2xl">
			{recentRecipeCount == null || recentIngredientCount == null || isLoading ? (
				<div className="h-48 grow flex justify-center items-center">
					<LoaderCircle className="animate-spin" />
				</div>
			) : (
				<Fragment>
					{/* Info */}
					<div className="flex flex-col gap-7 px-6 py-8 grow">
						{/* Recipe + Ingredient count */}
						<div className="flex gap-16">
							{/* Recipe count */}
							<div className="flex gap-2">
								<p className="font-semibold text-neutral-600">Recipes:</p>
								<p className="text-5xl">{recentRecipeCount}</p>
							</div>
							{/* Ingredient count */}
							<div className="flex gap-2">
								<p className="font-semibold text-neutral-600">Ingredients:</p>
								<p className="text-5xl">{recentIngredientCount}</p>
							</div>
						</div>

						{/* Encouragement */}

						<p className="text-neutral-600 font-medium">
							{recentRecipeCount === 0
								? "No recipes yet, add your first to expand your cooking archive!"
								: `${recentRecipeCount} recipe${getPluralEnding(
										recentRecipeCount
								  )}, Impressive! Keep adding more to expand your cooking archive!`}
						</p>
					</div>

					{/* Actions */}
					{/* <div className="flex flex-col gap-4 px-6 py-7">
						<Link
							href="/available-recipes"
							className="p-4 text-nowrap bg-sky-600 rounded-xl tracking-wide
							text-white font-medium text-center hover:bg-sky-500"
						>
							See What You Can Make?
						</Link>
						<Link
							href="/my-ingredients"
							className="p-4 text-nowrap rounded font-medium tracking-wide
							text-center text-neutral-600 hover:text-black"
						>
							View All Ingredients
						</Link>
					</div> */}
				</Fragment>
			)}
		</section>
	);
};

export default Overview;
