import { LargeRecipeCardProps } from "@/types";
import Image from "next/image";
import InfoWidget from "./InfoWidget";
import { Clock, Gauge, Refrigerator } from "lucide-react";

const LargeRecipeCard = ({ recipe }: LargeRecipeCardProps) => {
	return (
		<div className="min-w-[350px] flex flex-col rounded-xl card-container cursor-pointer">
			{/* Recipe image */}
			<div className="w-full h-48 relative overflow-hidden rounded-t-xl">
				<Image
					src={recipe.images[0].path}
					alt="food"
					className="object-cover"
					fill
					sizes="33vw"
					priority
				/>
			</div>

			{/* Info */}
			<div className="flex flex-col gap-3 p-3 ">
				<p className="font-bold">{recipe.name}</p>
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
