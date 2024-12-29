import { CircleX, Trash2 } from "lucide-react";

interface RecipeDeletionConfirmModalProps {
	onModalClose: () => void;
	onRecipeDelete: () => void;
}

const RecipeDeletionConfirmModal = ({
	onModalClose,
	onRecipeDelete,
}: RecipeDeletionConfirmModalProps) => {
	return (
		<section className="fixed inset-0 flex justify-center items-center bg-black/15">
			<div className="w-96 flex flex-col gap-4 bg-gray-100 p-6 rounded-xl shadow-sm">
				{/* Message */}
				<p className="font-medium">Are you sure you want to delete this recipe?</p>

				{/* Buttons */}
				<div className="grid grid-cols-2 gap-3">
					{/* Confirm deletion */}
					<button
						type="button"
						className="bg-red-400 flex justify-center items-center gap-2 p-1.5 
						rounded-full hover:bg-red-500"
						onClick={onRecipeDelete}
					>
						<Trash2 size={20} color="white" />
						<p className="text-white font-medium">Confirm</p>
					</button>

					{/* Cancel deletion */}
					<button
						type="button"
						className="bg-yellow-400 flex justify-center items-center gap-2 p-1.5 
						rounded-full hover:bg-yellow-500"
						onClick={onModalClose}
					>
						<CircleX size={20} color="white" />
						<p className="text-white font-medium">Cancel</p>
					</button>
				</div>
			</div>
		</section>
	);
};

export default RecipeDeletionConfirmModal;
