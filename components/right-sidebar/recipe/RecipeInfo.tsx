"use client";

import InfoWidget from "@/components/common/InfoWidget";
import { Recipe } from "@/types";
import { getDifficulty, getTimeStr } from "@/utils";
import { Clock, Gauge, Pencil, Refrigerator, Trash2, Users } from "lucide-react";
import RecipeDeletionConfirmModal from "./RecipeDeletionConfirmModal";
import { useContext, useState } from "react";
import { RefreshContext } from "@/components/common/FetchContext";
import { deleteRecipeApi } from "@/api";

interface RecipeInfoProps {
	recipe: Recipe;
}

const RecipeInfo = ({ recipe }: RecipeInfoProps) => {
	const { refresh } = useContext(RefreshContext)!;

	const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);

	const showDeletionModal = () => {
		setIsDeletionModalOpen(true);
	};

	const closeDeletionModal = () => {
		setIsDeletionModalOpen(false);
	};

	const deleteRecipe = async () => {
		await deleteRecipeApi(recipe.id);
		closeDeletionModal();
		refresh();
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Row 1 */}
			<div className="flex justify-between items-center">
				{/* Time */}
				<InfoWidget
					icon={<Clock size={16} />}
					iconColor="text-emerald-500"
					text={getTimeStr(recipe.duration)}
					small
				/>
				{/* Difficulty */}
				<InfoWidget
					icon={<Gauge size={16} />}
					iconColor="text-orange-500"
					text={getDifficulty(recipe.difficulty)}
					small
				/>
				{/* Ingredients */}
				<InfoWidget
					icon={<Refrigerator size={16} />}
					iconColor="text-sky-500"
					text={`${recipe.ingredients.length} Ing.`}
					small
				/>
			</div>

			{/* Row 2 */}
			<div className="flex justify-between items-center">
				{/* Portion */}
				<InfoWidget
					icon={<Users size={16} />}
					iconColor="text-violet-500"
					text={`${recipe.numServings} P.`}
					small
				/>
				{/* Edit */}
				<InfoWidget
					icon={<Pencil size={16} />}
					iconColor="text-yellow-500"
					text="Edit"
					onClick={() => {}}
					small
				/>
				{/* Delete */}
				<InfoWidget
					icon={<Trash2 size={16} />}
					iconColor="text-red-500"
					text="Delete"
					onClick={showDeletionModal}
					small
				/>
			</div>
			{isDeletionModalOpen && (
				<RecipeDeletionConfirmModal
					onModalClose={closeDeletionModal}
					onRecipeDelete={deleteRecipe}
				/>
			)}
		</div>
	);
};

export default RecipeInfo;
