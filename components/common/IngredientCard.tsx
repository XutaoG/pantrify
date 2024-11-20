"use client";

import { IngredientCardProps } from "@/types";
import { useState } from "react";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import IngredientFormModal from "../my-ingredients/IngredientFormModal";
import { deleteIngredient } from "@/api";

const IngredientCard = ({ mode, icon, ingredient }: IngredientCardProps) => {
	const [showModalForEdit, setShowModalForEdit] = useState(false);

	const openModal = () => {
		setShowModalForEdit(true);
	};

	const closeModal = () => {
		setShowModalForEdit(false);
	};

	const submitDeleteIngredient = async () => {
		await deleteIngredient(ingredient.id);
	};

	return (
		<div
			className="h-16 flex justify-between items-center gap-3 rounded 
			bg-neutral-100 px-3 py-4 border border-neutral-200"
		>
			{/* Info */}
			<div className="flex gap-1 items-center min-w-0">
				<div className="text-xl">{icon}</div>
				<p className="text-nowrap truncate font-semibold">{ingredient.name}</p>
			</div>

			{/* Actions */}
			<div className="flex gap-1.5 items-center">
				<button type="button" className="rounded-full bg-yellow-400 p-1.5" onClick={openModal}>
					<MdOutlineEdit className="text-lg text-white" />
				</button>
				<button type="button" className="rounded-full bg-red-400 p-1.5" onClick={submitDeleteIngredient}>
					<MdOutlineDelete className="text-lg text-white" />
				</button>
			</div>

			{/* Modal */}
			{showModalForEdit && <IngredientFormModal mode={mode} ingredient={ingredient} onModalClose={closeModal} />}
		</div>
	);
};

export default IngredientCard;
