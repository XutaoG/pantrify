import { RecipeIngredientCardProps } from "@/types";
import { MdDelete, MdEdit } from "react-icons/md";

const RecipeIngredientCard = ({ index, ingredient, onEdit, onDelete, isSubmitting }: RecipeIngredientCardProps) => {
	const hideQuantity =
		ingredient.quantityWhole == "" && (ingredient.quantityFraction == "" || ingredient.quantityFraction == "None");

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

			<div className="flex gap-2">
				{/* Edit */}
				<button
					className="self-center bg-yellow-400 rounded-full size-10 hover:bg-yellow-500
					flex justify-center items-center border"
					onClick={() => {
						onEdit(index, ingredient);
					}}
					disabled={isSubmitting}
				>
					<MdEdit className="text-white text-2xl" />
				</button>
				{/* Delete */}
				<button
					className="self-center bg-red-400 rounded-full size-10 hover:bg-red-500 
					flex justify-center items-center border"
					onClick={() => {
						onDelete(index);
					}}
					disabled={isSubmitting}
				>
					<MdDelete className="text-white text-2xl" />
				</button>
			</div>
		</div>
	);
};

export default RecipeIngredientCard;
