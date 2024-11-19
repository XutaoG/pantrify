"use client";

import { MdOutlineAddCircle } from "react-icons/md";
import { Fragment, useState } from "react";
import { TAddIngredientSchema } from "@/types";
import IngredientFormModal from "../my-ingredients/IngredientFormModal";

const AddShoppingListcontroller = () => {
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
				className="bg-sky-600 hover:bg-sky-500 py-2 rounded flex justify-center items-center"
				onClick={openModal}
			>
				<div className="flex gap-2 items-center">
					<MdOutlineAddCircle className="text-white text-2xl" />
					<p className="text-white font-semibold">Add to Shopping List</p>
				</div>
			</button>
			{isIngredientModalOpen && (
				<IngredientFormModal mode="shopping" onModalClose={closeModel} onIngredientAdd={addIngredient} />
			)}
		</Fragment>
	);
};

export default AddShoppingListcontroller;
