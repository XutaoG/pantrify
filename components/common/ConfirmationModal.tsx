import { CircleX, Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface ConfirmationModalProps {
	message: string;
	confirmationIcon?: ReactNode;
	confirmText: string;
	cancelIcon?: ReactNode;
	cancelText: string;
	onModalClose: () => void;
	onConfirm: () => void;
}

const ConfirmationModal = ({
	message,
	confirmText,
	confirmationIcon,
	cancelText,
	cancelIcon,
	onModalClose,
	onConfirm,
}: ConfirmationModalProps) => {
	return (
		<section className="fixed inset-0 flex justify-center items-center bg-black/15 z-50 text-base">
			<div className="w-96 flex flex-col gap-4 bg-gray-100 p-6 rounded-xl shadow-sm">
				{/* Message */}
				<p className="font-medium">{message}</p>

				{/* Buttons */}
				<div className="grid grid-cols-2 gap-3">
					{/* Confirm deletion */}
					<button
						type="button"
						className="bg-red-400 flex justify-center items-center gap-2 p-1.5 
						rounded-full hover:bg-red-500"
						onClick={onConfirm}
					>
						{confirmationIcon || <Trash2 size={20} color="white" />}
						<p className="text-white font-medium">{confirmText}</p>
					</button>

					{/* Cancel deletion */}
					<button
						type="button"
						className="bg-yellow-400 flex justify-center items-center gap-2 p-1.5 
						rounded-full hover:bg-yellow-500"
						onClick={onModalClose}
					>
						{cancelIcon || <CircleX size={20} color="white" />}
						<p className="text-white font-medium">{cancelText}</p>
					</button>
				</div>
			</div>
		</section>
	);
};

export default ConfirmationModal;
