"use client";

import { MdOutlineAddCircle } from "react-icons/md";
import IngredientFormModal from "./IngredientFormModal";
import { Fragment, useState } from "react";
import { TAddIngredientSchema } from "@/types";

const AddIngredientController = () => {
	// * Model control
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

	const openModal = () => {
		setIsIngredientModalOpen(true);
	};

	const closeModel = () => {
		setIsIngredientModalOpen(false);
	};

	const addIngredient = (ingredient: TAddIngredientSchema) => {
		console.log(ingredient);
		return null;
	};

	return (
		<Fragment>
			<button
				type="button"
				className="bg-sky-600 hover:bg-sky-500 py-2 rounded shadow-md flex justify-center items-center"
				onClick={openModal}
			>
				<div className="flex gap-2 items-center">
					<MdOutlineAddCircle className="text-white text-2xl" />
					<p className="text-white font-semibold">Add Ingredient</p>
				</div>
			</button>
			{isIngredientModalOpen && <IngredientFormModal onModalClose={closeModel} onIngredientAdd={addIngredient} />}
		</Fragment>
	);
};

export default AddIngredientController;
