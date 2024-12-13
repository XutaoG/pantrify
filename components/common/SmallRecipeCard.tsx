import Image from "next/image";
import InfoWidget from "./InfoWidget";
import { Clock } from "lucide-react";
import { Recipe } from "@/types";
import { defaultRecipeImageRoute } from "@/constants";
import { getTimeStr } from "@/utils";

interface SmallRecipeCardProps {
	recipe: Recipe;
}

const SmallRecipeCard = ({ recipe }: SmallRecipeCardProps) => {
	return (
		<div className="flex flex-col rounded-xl aspect-[5/4] card-container cursor-pointer">
			{/* Recipe image */}
			<div className="w-full grow relative overflow-hidden rounded-t-xl">
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
			<div className="flex justify-between items-center gap-4 p-2">
				<p className="font-medium tracking-wide truncate text-nowrap">{recipe.name}</p>
				{/* Time */}
				<InfoWidget
					icon={<Clock size={16} />}
					iconColor="text-emerald-500"
					text={getTimeStr(recipe.duration)}
				/>
			</div>
		</div>
	);
};

export default SmallRecipeCard;
