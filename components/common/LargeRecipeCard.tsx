import { LargeRecipeCardProps } from "@/types";
import Image from "next/image";
import { MdAccessTime, MdOutlineSpeed, MdOutlineKitchen } from "react-icons/md";

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
			<div className="flex flex-col gap-4 p-3 bg-neutral-100 border border-neutral-200">
				<p className="font-bold">{recipe.name}</p>
				<div className="flex justify-between">
					{/* Time */}
					<div className="flex flex-col gap-1 items-center">
						<MdAccessTime className="text-xl text-emerald-500" />
						<p className="text-sm text-neutral-600 font-semibold">
							{recipe.time}
						</p>
					</div>
					{/* Difficulty */}
					<div className="flex flex-col gap-1 items-center">
						<MdOutlineSpeed className="text-xl text-orange-500" />
						<p className="text-sm text-neutral-600 font-semibold">
							{recipe.difficulty}
						</p>
					</div>
					{/* Ingredients */}
					<div className="flex flex-col gap-1 items-center">
						<MdOutlineKitchen className="text-xl text-sky-500" />
						<p className="text-sm text-neutral-600 font-semibold">
							{recipe.numIngredients} Ing.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LargeRecipeCard;
