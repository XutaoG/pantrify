"use client";

import { CirclePlus } from "lucide-react";
import IngredientFormModal from "./IngredientFormModal";
import { Fragment, useState } from "react";

interface AddIngredientControllerProps {
	mode: "ingredient" | "shopping";
}

const AddIngredientController = ({ mode }: AddIngredientControllerProps) => {
	// * Model control
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);

	const openModal = () => {
		setIsIngredientModalOpen(true);
	};

	const closeModel = () => {
		setIsIngredientModalOpen(false);
	};

	return (
		<Fragment>
			<button
				type="button"
				className="bg-sky-600 hover:bg-sky-500 py-2 rounded-xl flex justify-center items-center"
				onClick={openModal}
			>
				<div className="flex gap-2 items-center">
					<CirclePlus size={20} color="white" />
					<p className="text-white font-semibold tracking-wide">
						{mode === "ingredient" ? "My Ingredients" : "Add to Shopping List"}
					</p>
				</div>
			</button>
			{isIngredientModalOpen && <IngredientFormModal mode={mode} onModalClose={closeModel} />}
		</Fragment>
	);
};

export default AddIngredientController;
