import {
	MdKeyboardDoubleArrowUp,
	MdKeyboardDoubleArrowDown,
	MdAdd,
} from "react-icons/md";

const FormInstructionInput = () => {
	return (
		<div className="flex shadow-md">
			{/* Move */}
			<div className="bg-neutral-200 flex flex-col justify-between rounded-l overflow-hidden">
				<div className="grow p-1 flex justify-center items-center hover:bg-neutral-300 cursor-pointer">
					<MdKeyboardDoubleArrowUp className="text-whit text-xl" />
				</div>
				<div className="grow p-1 flex justify-center items-center hover:bg-neutral-300 cursor-pointer">
					<MdKeyboardDoubleArrowDown className="text-whit text-xl" />
				</div>
			</div>

			<div className="grow flex gap-4 bg-neutral-100 border border-l-0 border-neutral-200 p-2 rounded-r">
				{/* Text area */}
				<div className="bg-white border border-neutral-200 rounded grow p-2 flex flex-col">
					<textarea
						className="bg-transparent outline-none focus:bg-transparent 
					min-h-20 max-h-20 resize-none"
						placeholder="Enter your recipe instruction"
					/>
				</div>

				{/* Add */}
				<div
					className="bg-emerald-500 rounded-md w-10 hover:bg-emerald-600 cursor-pointer
				flex justify-center items-center border"
				>
					<MdAdd className="text-white text-3xl" />
				</div>
			</div>
		</div>
	);
};

export default FormInstructionInput;
