"use client";

import Image from "next/image";
import InfoWidget from "./InfoWidget";
import { Clock, Images } from "lucide-react";
import { Recipe } from "@/types";
import { defaultRecipeImageRoute } from "@/constants";
import { getTimeStr, isRecipe } from "@/utils";
import { ActiveViewContext } from "./ActiveViewContext";
import { useContext } from "react";

interface SmallRecipeCardProps {
	recipe: Recipe;
}

const SmallRecipeCard = ({ recipe }: SmallRecipeCardProps) => {
	//! Context
	const view = useContext(ActiveViewContext);
	const { activeView, setActiveView } = view!;

	const isCurrentlyViewed =
		activeView != null && isRecipe(activeView) && activeView.id === recipe.id;

	return (
		<div
			className={`flex flex-col rounded-xl aspect-[5/4] card-container cursor-pointer overflow-hidden ${
				isCurrentlyViewed && "border-neutral-300"
			}`}
			onClick={() => setActiveView(recipe)}
		>
			{/* Recipe image */}
			{recipe.images.length !== 0 ? (
				<div className="w-full grow relative">
					<Image
						src={
							recipe.images.length !== 0
								? recipe.images[0].path
								: defaultRecipeImageRoute
						}
						alt="food"
						className="object-cover"
						fill
						sizes="33vw"
						priority
					/>
				</div>
			) : (
				<div className="w-full grow flex justify-center items-center bg-neutral-200">
					{/* Recipe with no image placeholder */}
					<Images size={36} className="text-neutral-500" />
				</div>
			)}

			{/* Info */}
			<div className="flex justify-between items-center gap-4 p-2">
				<p className="tracking-wide truncate text-nowrap text-neutral-700 font-medium">
					{recipe.name}
				</p>
				{/* Time */}
				<InfoWidget
					icon={<Clock size={16} />}
					iconColor="text-emerald-500"
					text={getTimeStr(recipe.duration)}
					small
				/>
			</div>
		</div>
	);
};

export default SmallRecipeCard;
