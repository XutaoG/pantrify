import { SmallRecipeCardProps } from "@/types";
import Image from "next/image";
import { MdAccessTime } from "react-icons/md";

const SmallRecipeCard = ({ recipe }: SmallRecipeCardProps) => {
	return (
		<div className="flex flex-col rounded shadow-md scroll-pl-6 aspect-[3/2]">
			{/* Recipe image */}
			<div className="w-full grow relative">
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
			<div className="flex justify-between items-center gap-4 p-3 bg-neutral-100 border border-neutral-200">
				<p className="font-bold truncate text-nowrap">{recipe.name}</p>
				{/* Time */}
				<div className="flex flex-col gap-1 items-center">
					<MdAccessTime className="text-xl text-emerald-500" />
					<p className="text-sm text-neutral-600 font-semibold">
						{recipe.time}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SmallRecipeCard;
