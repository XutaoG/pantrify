"use client";

import { Recipe } from "@/types";
import Image from "next/image";
import InfoWidget from "./InfoWidget";
import { Clock, Gauge, Refrigerator } from "lucide-react";
import { defaultRecipeImageRoute } from "@/constants";
import { ActiveViewContext } from "./ActiveViewContext";
import { useContext } from "react";

interface LargeRecipeCardProps {
	recipe: Recipe;
}

const LargeRecipeCard = ({ recipe }: LargeRecipeCardProps) => {
	//! Context
	const view = useContext(ActiveViewContext);
	const { setActiveView } = view!;

	return (
		<div
			className="min-w-[350px] flex flex-col rounded-xl card-container cursor-pointer"
			onClick={() => setActiveView(recipe)}
		>
			{/* Recipe image */}
			<div className="w-full h-48 relative overflow-hidden rounded-t-xl">
				<Image
					src={
						recipe.images.length !== 0 ? recipe.images[0].path : defaultRecipeImageRoute
					}
					alt="food"
					className="object-cover"
					fill
					sizes="33vw"
					priority
				/>
			</div>

			{/* Info */}
			<div className="flex flex-col gap-4 p-3">
				<p className="font-medium tracking-wide truncate text-nowrap">{recipe.name}</p>
				<div className="flex justify-between">
					{/* Time */}
					<InfoWidget
						icon={<Clock size={16} />}
						iconColor="text-emerald-500"
						text={recipe.duration.toString()}
					/>
					{/* Difficulty */}
					<InfoWidget
						icon={<Gauge size={16} />}
						iconColor="text-orange-500"
						text={recipe.difficulty.toString()}
					/>
					{/* Ingredients */}
					<InfoWidget
						icon={<Refrigerator size={16} />}
						iconColor="text-sky-500"
						text={`${recipe.ingredients.length} Ing.`}
					/>
				</div>
			</div>
		</div>
	);
};

export default LargeRecipeCard;
