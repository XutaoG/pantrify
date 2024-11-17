import { FormInstructionInputProps } from "@/types";
import {
	MdKeyboardDoubleArrowUp,
	MdKeyboardDoubleArrowDown,
	MdOutlineDeleteForever,
} from "react-icons/md";

const FormInstructionInput = ({
	index,
	value,
	onInstructionEdit,
	onInstructionRemove,
	onInstructionMove,
}: FormInstructionInputProps) => {
	return (
		<div className="flex shadow-md rounded">
			{/* Move */}
			<div className="bg-neutral-200 flex flex-col justify-between rounded-l overflow-hidden">
				<button
					className="grow p-1 flex justify-center items-center hover:bg-neutral-300"
					onClick={() => {
						onInstructionMove(index, -1);
					}}
				>
					<MdKeyboardDoubleArrowUp className="text-whit text-xl" />
				</button>
				<button
					className="grow p-1 flex justify-center items-center hover:bg-neutral-300"
					onClick={() => {
						onInstructionMove(index, 1);
					}}
				>
					<MdKeyboardDoubleArrowDown className="text-whit text-xl" />
				</button>
			</div>

			<div className="grow flex gap-3 bg-neutral-100 border border-l-0 border-neutral-200 p-2 px-3 rounded-r">
				{/* Step */}
				<div className="flex justify-center items-center px-2 border bg-neutral-200  rounded">
					<p className="font-medium">{index + 1}</p>
				</div>

				{/* Text area */}
				<div className="bg-white border border-neutral-200 rounded grow p-2 flex flex-col">
					<textarea
						// {...register("instruction")}
						className="bg-transparent outline-none focus:bg-transparent 
						min-h-12 max-h-12 resize-none"
						placeholder="Enter your recipe instruction"
						value={value}
						onChange={(event) => {
							onInstructionEdit(index, event.target.value);
						}}
					/>
				</div>

				{/* Delete */}
				<div
					className="self-center bg-red-400 rounded-full size-10 hover:bg-red-500 cursor-pointer
					flex justify-center items-center border"
					onClick={() => {
						onInstructionRemove(index);
					}}
				>
					<MdOutlineDeleteForever className="text-white text-2xl" />
				</div>
			</div>
		</div>
	);
};

export default FormInstructionInput;
