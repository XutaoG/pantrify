import { IngredientProps } from "@/types";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";

const Ingredient = ({ ingredient }: IngredientProps) => {
	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-2 items-center">
				{ingredient.isAvailable ? (
					<MdOutlineCheck className="text-lg text-emerald-500" />
				) : (
					<MdOutlineClose className="text-lg text-red-500" />
				)}
				<p className="font-medium">
					{ingredient.name}
					{ingredient.amount && (
						<span>
							{":"} {ingredient.amount}
						</span>
					)}
				</p>
			</div>
		</div>
	);
};

export default Ingredient;
