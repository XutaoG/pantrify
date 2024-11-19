import { IngredientCardProps } from "@/types";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";

const IngredientCard = ({ icon, ingredient }: IngredientCardProps) => {
	return (
		<div
			className="h-16 flex justify-between items-center gap-3 rounded 
			bg-neutral-100 px-3 py-4"
		>
			{/* Info */}
			<div className="flex gap-1 items-center min-w-0">
				<div className="text-xl">{icon}</div>
				<p className="text-nowrap truncate font-semibold">{ingredient.name}</p>
			</div>

			{/* Actions */}
			<div className="flex gap-1.5 items-center">
				<button type="button" className="rounded-full bg-yellow-400 p-1.5">
					<MdOutlineEdit className="text-lg text-white" />
				</button>
				<button type="button" className="rounded-full bg-red-400 p-1.5">
					<MdOutlineDelete className="text-lg text-white" />
				</button>
			</div>
		</div>
	);
};

export default IngredientCard;
