import { SmallRecipeCardProps } from "@/types";
import Image from "next/image";
import { MdAccessTime } from "react-icons/md";
import InfoWidget from "./InfoWidget";

const SmallRecipeCard = ({ recipe }: SmallRecipeCardProps) => {
	return (
		<div className="flex flex-col rounded shadow-md scroll-pl-6 aspect-[5/4]">
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
			<div className="flex justify-between items-center gap-4 p-2 bg-neutral-100 border border-neutral-200">
				<p className="font-bold truncate text-nowrap">{recipe.name}</p>
				{/* Time */}
				{/* Time */}
				<InfoWidget
					icon={<MdAccessTime />}
					iconColor="text-emerald-500"
					text={recipe.time}
				/>
			</div>
		</div>
	);
};

export default SmallRecipeCard;
