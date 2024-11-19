import { FormInstructionInputProps } from "@/types";
import { MdDelete, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

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
				<button
					className="grow p-2 flex justify-center items-center hover:bg-neutral-300"
					onClick={() => {
						onInstructionMove(index, -1);
					}}
					disabled={isSubmitting}
				>
					<MdKeyboardArrowUp className="text-whit text-xl" />
				</button>
				<button
					className="grow p-2 flex justify-center items-center hover:bg-neutral-300"
					onClick={() => {
						onInstructionMove(index, 1);
					}}
					disabled={isSubmitting}
				>
					<MdKeyboardArrowDown className="text-whit text-xl" />
				</button>
			</div>

			<div className="grow flex gap-3 bg-neutral-100 border border-l-0 border-neutral-200 p-2 px-3 rounded-r">
				{/* Step */}
				<div className="flex justify-center items-center px-3 border bg-neutral-200  rounded">
					<p className="font-medium select-none">{index + 1}</p>
				</div>

				{/* Text area */}
				<div className="bg-white border border-neutral-200 rounded grow p-2 flex flex-col">
					<textarea
						className="bg-transparent outline-none focus:bg-transparent 
						min-h-12 max-h-12 resize-none"
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
					className="self-center bg-red-400 rounded-full size-10 hover:bg-red-500
					flex justify-center items-center border"
					onClick={() => {
						onInstructionRemove(index);
					}}
					disabled={isSubmitting}
				>
					<MdDelete className="text-white text-2xl" />
				</button>
			</div>
		</div>
	);
};

export default RecipeInstructionCard;
