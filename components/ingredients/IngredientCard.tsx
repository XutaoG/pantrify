"use client";

import { useContext, useState } from "react";
import IngredientFormModal from "../ingredients/IngredientFormModal";
import { deleteIngredient, moveToCart, moveToInventory } from "@/api";
import { Archive, Egg, Milk, Pencil, ShoppingCart, Trash2 } from "lucide-react";
import { ActiveViewContext } from "../common/ActiveViewContext";
import { Ingredient } from "@/types";
import { RefreshContext } from "../common/FetchContext";

interface IngredientCardProps {
	mode: "ingredient" | "shopping";
	ingredient: Ingredient;
}

const IngredientCard = ({ mode, ingredient }: IngredientCardProps) => {
	const [isHover, setIsHover] = useState(false);

	//! Context
	const { refresh } = useContext(RefreshContext)!;
	const view = useContext(ActiveViewContext);
	const { setActiveView } = view!;

	//! Modal
	const [showModalForEdit, setShowModalForEdit] = useState(false);

	const openModal = () => {
		setIsHover(false);
		setShowModalForEdit(true);
	};

	const closeModal = () => {
		setShowModalForEdit(false);
	};

	//* Move ingredient to cart or inventory
	const submitMove = async () => {
		if (mode == "ingredient") {
			await moveToCart(ingredient.id);
		} else {
			await moveToInventory(ingredient.id);
		}
		refresh();
	};

	//* Delete ingredient
	const submitDeleteIngredient = async () => {
		await deleteIngredient(ingredient.id);

		refresh();
	};

	//* Expiration date
	const expirationDate = ingredient.dateExpired ? new Date(ingredient?.dateExpired ?? "") : null;
	const expirationDateStr = expirationDate
		? `Exp: ${
				expirationDate.getMonth() + 1
		  }/${expirationDate.getDay()}/${expirationDate.getFullYear()}`
		: "Exp: None";

	return (
		<div
			className="h-16 flex justify-between items-center gap-3 rounded-xl 
			px-3 py-4 card-container cursor-pointer"
			onClick={() => setActiveView(ingredient)}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			{/* Info */}
			<div className="flex flex-col gap-1 truncate">
				<div className="flex gap-1.5 items-center">
					{ingredient.ingredientType == "Primary" ? (
						<Egg size={16} className="text-neutral-600 min-w-4" />
					) : (
						<Milk size={16} className="text-neutral-600 min-w-4" />
					)}
					<p className="font-medium text-nowrap truncate">{ingredient.name}</p>
				</div>
				{mode === "ingredient" && (
					<p className="text-sm text-neutral-600">{expirationDateStr}</p>
				)}
			</div>

			{/* Actions */}
			<div className={`flex gap-2 items-center ${!isHover && "hidden"}`}>
				{/* Edit */}
				<button
					type="button"
					className="bg-yellow-400 rounded-full size-8 hover:bg-yellow-500
					flex justify-center items-center"
					onClick={openModal}
				>
					<Pencil size={18} color="white" />
				</button>

				{/* Move */}
				<button
					type="button"
					className="bg-sky-600 rounded-full size-8 hover:bg-sky-500
					flex justify-center items-center"
					onClick={submitMove}
				>
					{mode === "ingredient" ? (
						<ShoppingCart size={18} color="white" />
					) : (
						<Archive size={18} color="white" />
					)}
				</button>

				{/* Delete */}
				<button
					type="button"
					className="bg-red-400 rounded-full size-8 hover:bg-red-500 
					flex justify-center items-center"
					onClick={submitDeleteIngredient}
				>
					<Trash2 size={18} color="white" />
				</button>
			</div>

			{/* Modal */}
			{showModalForEdit && (
				<IngredientFormModal
					mode={mode}
					ingredient={ingredient}
					onModalClose={closeModal}
				/>
			)}
		</div>
	);
};

export default IngredientCard;
