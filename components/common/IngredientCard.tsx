"use client";

import { IngredientCardProps } from "@/types";
import { useContext, useState } from "react";
import IngredientFormModal from "../my-ingredients/IngredientFormModal";
import { deleteIngredient } from "@/api";
import { Pencil, Trash2 } from "lucide-react";
import { FetchContext } from "@/app/(root)/my-ingredients/page";

const IngredientCard = ({ mode, icon, ingredient }: IngredientCardProps) => {
	//! Context
	const fetch = useContext(FetchContext);

	//! Modal
	const [showModalForEdit, setShowModalForEdit] = useState(false);

	const openModal = () => {
		setShowModalForEdit(true);
	};

	const closeModal = () => {
		setShowModalForEdit(false);
	};

	//* Delete ingredient
	const submitDeleteIngredient = async () => {
		await deleteIngredient(ingredient.id);

		if (fetch) {
			await fetch();
		} else {
			console.error("Context not found");
		}
	};

	return (
		<div
			className="h-16 flex justify-between items-center gap-3 rounded-xl 
			px-3 py-4 card-container"
		>
			{/* Info */}
			<div className="flex gap-1.5 items-center min-w-0">
				<div className="text-xl">{icon}</div>
				<p className="font-medium text-nowrap truncate ">{ingredient.name}</p>
			</div>

			{/* Actions */}
			<div className="flex gap-2 items-center">
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
