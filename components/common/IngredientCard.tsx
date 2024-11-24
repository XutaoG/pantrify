"use client";

import { useContext, useState } from "react";
import IngredientFormModal from "../my-ingredients/IngredientFormModal";
import { deleteIngredient } from "@/api";
import { Egg, Milk, Pencil, Trash2 } from "lucide-react";
import { FetchContext } from "./FetchContext";
import { ActiveViewContext } from "./ActiveViewContext";
import { Ingredient } from "@/types";
import Router from "next/router";

interface IngredientCardProps {
	mode: "ingredient" | "shopping";
	ingredient: Ingredient;
}

const IngredientCard = ({ mode, ingredient }: IngredientCardProps) => {
	const [isHover, setIsHover] = useState(false);

	//! Context
	// const fetch = useContext(FetchContext);
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

	//* Delete ingredient
	const submitDeleteIngredient = async () => {
		await deleteIngredient(ingredient.id);

		// if (fetch) {
		// 	await fetch();
		// } else {
		// 	console.error("Context not found");
		// }
		Router.reload();
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
			<div className="flex flex-col gap-1">
				<div className="flex gap-1.5 items-center min-w-0">
					{ingredient.ingredientType == "Primary" ? (
						<Egg size={16} className="text-neutral-600" />
					) : (
						<Milk size={16} className="text-neutral-600" />
					)}
					<p className="font-medium text-nowrap truncate ">{ingredient.name}</p>
				</div>
				{mode === "ingredient" && (
					<p className="text-sm text-neutral-600">{expirationDateStr}</p>
				)}
			</div>

			{/* Actions */}
			<div className={`flex gap-2 items-center ${!isHover && "hidden"}`}>
				<button
					type="button"
					className="bg-yellow-400 rounded-full size-8 hover:bg-yellow-500
					flex justify-center items-center"
					onClick={openModal}
				>
					<Pencil size={18} color="white" />
				</button>
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
