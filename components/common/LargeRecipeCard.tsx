import { LargeRecipeCardProps } from "@/types";
import Image from "next/image";
import { MdAccessTime, MdOutlineSpeed, MdOutlineKitchen } from "react-icons/md";
import InfoWidget from "./InfoWidget";

const LargeRecipeCard = ({ recipe }: LargeRecipeCardProps) => {
	return (
		<div className="w-[350px] flex flex-col rounded shadow-md scroll-pl-6 ">
			{/* Recipe image */}
			<div className="w-full h-48 relative">
				<Image
					src={recipe.imageUrl}
					alt="food"
					className="object-cover"
					fill
					sizes="33vw"
					priority
				/>
			</div>

			{/* Info */}
			<div className="flex flex-col gap-3 p-3 bg-neutral-100 border border-neutral-200">
				<p className="font-bold">{recipe.name}</p>
				<div className="flex justify-between">
					{/* Time */}
					<InfoWidget
						icon={<MdAccessTime />}
						iconColor="text-emerald-500"
						text={recipe.time}
					/>
					{/* Difficulty */}
					<InfoWidget
						icon={<MdOutlineSpeed />}
						iconColor="text-orange-500"
						text={recipe.difficulty}
					/>
					{/* Ingredients */}
					<InfoWidget
						icon={<MdOutlineKitchen />}
						iconColor="text-sky-500"
						text={`${recipe.numIngredients} Ing.`}
					/>
				</div>
			</div>
		</div>
	);
};

export default LargeRecipeCard;
