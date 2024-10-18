import { IngredientCardProps } from "@/types";
import {
	MdOutlineEgg,
	MdOutlineEdit,
	MdOutlineDeleteForever,
} from "react-icons/md";

const IngredientCard = ({ ingredient }: IngredientCardProps) => {
	return (
		<div
			className="flex justify-between items-center gap-3 rounded shadow-md 
			bg-neutral-100 px-3 py-4"
		>
			{/* Info */}
			<div className="flex gap-3 items-center min-w-0">
				<MdOutlineEgg className="text-xl" />
				<p className="text-nowrap truncate font-semibold">
					{ingredient.name}
				</p>
			</div>

			{/* Actions */}
			<div className="flex gap-4 items-center">
				<MdOutlineEdit className="text-xl cursor-pointer" />
				<MdOutlineDeleteForever className="text-xl cursor-pointer" />
			</div>
		</div>
	);
};

export default IngredientCard;
