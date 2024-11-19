import { SmallRecipeCardProps } from "@/types";
import Image from "next/image";
import { MdAccessTime } from "react-icons/md";
import InfoWidget from "./InfoWidget";

const SmallRecipeCard = ({ recipe }: SmallRecipeCardProps) => {
	return (
		<div className="flex flex-col rounded aspect-[5/4] bg-neutral-100 border border-neutral-200">
			{/* Recipe image */}
			<div className="w-full grow relative overflow-hidden rounded-t">
				<Image src={recipe.images[0].path} alt="food" className="object-cover" fill sizes="33vw" priority />
			</div>

			{/* Info */}
			<div className="flex justify-between items-center gap-4 p-2">
				<p className="font-bold truncate text-nowrap">{recipe.name}</p>
				{/* Time */}
				<InfoWidget icon={<MdAccessTime />} iconColor="text-emerald-500" text={recipe.duration.toString()} />
			</div>
		</div>
	);
};

export default SmallRecipeCard;
