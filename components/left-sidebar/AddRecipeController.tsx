"use client";

import { addRecipeRoute } from "@/constants/routes";
import { Fragment, useState } from "react";
import RecipeFormModal from "../add/RecipeFormModal";

const AddRecipeController = () => {
	const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);

	const openModal = () => {
		setIsAddRecipeModalOpen(true);
	};

	const closeModal = () => {
		setIsAddRecipeModalOpen(false);
	};

	return (
		<Fragment>
			{/* Add recipe button */}
			<button
				type="button"
				onClick={openModal}
				className="flex justify-left gap-4 p-2 sm:p-4 rounded-xl md:rounded-2xl font-semibold 
				bg-sky-600 hover:bg-sky-500 cursor-pointer "
			>
				{addRecipeRoute.icon}
				<p className="hidden 2xl:block text-white text-nowrap">Add New Recipe</p>
			</button>

			{/* Add recipe modal */}
			{isAddRecipeModalOpen && <RecipeFormModal onModalClose={closeModal} />}
		</Fragment>
	);
};

export default AddRecipeController;
