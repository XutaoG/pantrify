import { RecipeIngredientCardProps } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

const RecipeIngredientCard = ({
	index,
	ingredient,
	onEdit,
	onDelete,
	isSubmitting,
}: RecipeIngredientCardProps) => {
	const hideQuantity =
		ingredient.quantityWhole == "" &&
		(ingredient.quantityFraction == "" || ingredient.quantityFraction == "None");

	return (
		<div className="bg-neutral-100 border border-neutral-200 rounded p-2 flex justify-between gap-2">
			<div className="flex flex-col gap-2">
				{/* Name */}
				<p className="font-semibold">{ingredient.name}</p>

				{/* Quantity */}
				{hideQuantity ? (
					<p className="text-sm text-neutral-600 font-medium">Quantity unspecified</p>
				) : (
					<p className="text-sm font-medium">
						{ingredient.quantityWhole}{" "}
						{ingredient.quantityFraction !== "None" ? ingredient.quantityFraction : ""}{" "}
						{ingredient.quantityUnit !== "None" ? ingredient.quantityUnit : ""}
					</p>
				)}
			</div>

			<div className="flex gap-2 items-center">
				{/* Edit */}
				<button
					type="button"
					className="bg-yellow-400 rounded-full size-8 hover:bg-yellow-500
					flex justify-center items-center"
					onClick={() => onEdit(index, ingredient)}
					disabled={isSubmitting}
				>
					<Pencil size={18} color="white" />
				</button>
				{/* Delete */}
				<button
					type="button"
					className="bg-red-400 rounded-full size-8 hover:bg-red-500 
					flex justify-center items-center"
					onClick={() => onDelete(index)}
					disabled={isSubmitting}
				>
					<Trash2 size={18} color="white" />
				</button>
			</div>
		</div>
	);
};

export default RecipeIngredientCard;
