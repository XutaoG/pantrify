import { IngredientCardProps } from "@/types";
import {
	MdOutlineEdit,
	MdOutlineDeleteForever,
	MdAddShoppingCart,
} from "react-icons/md";

const IngredientCard = ({ icon, ingredient }: IngredientCardProps) => {
	return (
		<div
			className="flex justify-between items-center gap-3 rounded shadow-md 
			bg-neutral-100 px-3 py-4"
		>
			{/* Info */}
			<div className="flex gap-3 items-center min-w-0">
				<div className="text-xl">{icon}</div>
				<p className="text-nowrap truncate font-semibold">
					{ingredient.name}
				</p>
			</div>

			{/* Actions */}
			<div className="flex gap-3 items-center">
				<MdAddShoppingCart className="text-xl cursor-pointer" />
				<MdOutlineEdit className="text-xl cursor-pointer" />
				<MdOutlineDeleteForever className="text-xl cursor-pointer" />
			</div>
		</div>
	);
};

export default IngredientCard;
