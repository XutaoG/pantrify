"use client";

import { Recipe } from "@/types";
import Image from "next/image";
import InfoWidget from "./InfoWidget";
import { Clock, Gauge, Images, Refrigerator } from "lucide-react";
import { ActiveViewContext } from "./ActiveViewContext";
import { useContext } from "react";
import { getDifficulty, getTimeStr } from "@/utils";

interface LargeRecipeCardProps {
	recipe: Recipe;
}

const LargeRecipeCard = ({ recipe }: LargeRecipeCardProps) => {
	//! Context
	const view = useContext(ActiveViewContext);
	const { setActiveView } = view!;

	return (
		<div
			className="min-w-[275px] sm:min-w-[350px]
			flex flex-col rounded-xl card-container cursor-pointer"
			onClick={() => setActiveView(recipe)}
		>
			{recipe.images.length !== 0 ? (
				<div className="w-full h-36 sm:h-48 relative overflow-hidden rounded-t-xl">
					{/* Recipe image */}
					<Image
						src={recipe.images[0].path}
						alt="food"
						className="object-cover"
						fill
						sizes="33vw"
						priority
					/>
				</div>
			) : (
				<div
					className="w-full h-36 sm:h-48 relative overflow-hidden rounded-t-xl 
					flex justify-center items-center bg-neutral-200"
				>
					{/* Recipe with no image placeholder */}
					<Images size={60} className="text-neutral-500" />
				</div>
			)}

			{/* Info */}
			<div className="flex flex-col gap-3 sm:gap-4 p-2 sm:p-3">
				{/* Name */}
				<p className="font-medium tracking-wide truncate text-nowrap text-neutral-700">
					{recipe.name}
				</p>

				<div className="flex justify-between">
					{/* Time */}
					<InfoWidget
						icon={<Clock size={16} />}
						iconColor="text-emerald-500"
						text={getTimeStr(recipe.duration)}
						small
					/>
					{/* Difficulty */}
					<InfoWidget
						icon={<Gauge size={16} />}
						iconColor="text-orange-500"
						text={getDifficulty(recipe.difficulty)}
						small
					/>
					{/* Ingredients */}
					<InfoWidget
						icon={<Refrigerator size={16} />}
						iconColor="text-sky-500"
						text={`${recipe.ingredients.length} Ing.`}
						small
					/>
				</div>
			</div>
		</div>
	);
};

export default LargeRecipeCard;
