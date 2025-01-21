"use client";

import { RecipeIngredientObj } from "@/types";
import { getQuantityStr } from "@/utils";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface RecipeIngredientCardProps {
	ingredient: RecipeIngredientObj;
	onEdit: (ingredient: RecipeIngredientObj) => void;
	onDelete: (index: string) => void;
	isSubmitting: boolean;
}

const RecipeIngredientCard = ({
	ingredient,
	onEdit,
	onDelete,
	isSubmitting,
}: RecipeIngredientCardProps) => {
	const [isHover, setIsHover] = useState(false);

	const quantityStr = getQuantityStr(ingredient);

	return (
		<div
			className="card-container rounded-xl p-2 flex justify-between gap-2"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<div className="flex flex-col gap-2 truncate">
				{/* Name */}
				<p className="text-nowrap truncate">{ingredient.name}</p>

				{/* Quantity */}
				{quantityStr == null ? (
					<p className="text-sm text-neutral-600 font-medium text-nowrap truncate">
						Quantity unspecified
					</p>
				) : (
					<p className="text-sm text-neutral-600 font-medium">{quantityStr}</p>
				)}
			</div>

			{/* Actions */}
			<div className={`flex gap-2 items-center ${!isHover && "hidden"}`}>
				{/* Edit */}
				<button
					type="button"
					className="bg-yellow-400 rounded-full size-8 hover:bg-yellow-500
					flex justify-center items-center"
					onClick={() => onEdit(ingredient)}
					disabled={isSubmitting}
				>
					<Pencil size={18} color="white" />
				</button>
				{/* Delete */}
				<button
					type="button"
					className="bg-red-400 rounded-full size-8 hover:bg-red-500 
					flex justify-center items-center"
					onClick={() => onDelete(ingredient.id)}
					disabled={isSubmitting}
				>
					<Trash2 size={18} color="white" />
				</button>
			</div>
		</div>
	);
};

export default RecipeIngredientCard;
