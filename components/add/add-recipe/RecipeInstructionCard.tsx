import { FormInstructionInputProps } from "@/types";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

const RecipeInstructionCard = ({
	index,
	value,
	onInstructionEdit,
	onInstructionRemove,
	onInstructionMove,
	isSubmitting,
}: FormInstructionInputProps) => {
	return (
		<div className="flex rounded">
			{/* Move */}
			<div className="bg-neutral-200 flex flex-col justify-between rounded-l overflow-hidden">
				{/* Move up */}
				<button
					type="button"
					className={`grow p-2 flex justify-center items-center  ${
						isSubmitting ? "cursor-not-allowed" : "hover:bg-neutral-300"
					}`}
					onClick={() => onInstructionMove(index, -1)}
					disabled={isSubmitting}
				>
					<ChevronUp size={16} />
				</button>
				{/* Step */}
				<div className="grow py-0.5 flex justify-center items-center">
					<p className="font-medium text-sm select-none">{index + 1}</p>
				</div>

				{/* Move down */}
				<button
					type="button"
					className={`grow p-2 flex justify-center items-center  ${
						isSubmitting ? "cursor-not-allowed" : "hover:bg-neutral-300"
					}`}
					onClick={() => onInstructionMove(index, 1)}
					disabled={isSubmitting}
				>
					<ChevronDown size={16} />
				</button>
			</div>

			<div className="grow flex gap-3 bg-neutral-100 border border-l-0 border-neutral-200 p-2 px-3 rounded-r">
				{/* Text area */}
				<div className="bg-white border border-neutral-200 rounded grow p-2 flex flex-col">
					<textarea
						className={`bg-transparent outline-none focus:bg-transparent 
						min-h-12 max-h-12 resize-none ${isSubmitting && "cursor-not-allowed"}`}
						placeholder="Enter your recipe instruction"
						value={value}
						onChange={(event) => {
							onInstructionEdit(index, event.target.value);
						}}
						disabled={isSubmitting}
					/>
				</div>

				{/* Delete */}
				<button
					type="button"
					className={`self-center bg-red-400 rounded-full size-10 ${
						isSubmitting ? "cursor-not-allowed" : "hover:bg-red-500"
					}
					flex justify-center items-center`}
					onClick={() => onInstructionRemove(index)}
					disabled={isSubmitting}
				>
					<Trash2 color="white" size={20} />
				</button>
			</div>
		</div>
	);
};

export default RecipeInstructionCard;
