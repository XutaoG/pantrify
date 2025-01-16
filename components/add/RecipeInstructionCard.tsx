"use client";

import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";

interface FormInstructionInputProps {
	index: number;
	value: string;
	onInstructionEdit: (index: number, newInstruction: string) => void;
	onInstructionRemove: (index: number) => void;
	onInstructionMove: (index: number, direction: number) => void;
	isSubmitting: boolean;
	error?: string;
}

const RecipeInstructionCard = ({
	index,
	value,
	onInstructionEdit,
	onInstructionRemove,
	onInstructionMove,
	isSubmitting,
	error,
}: FormInstructionInputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isHover, setIsHover] = useState(false);

	return (
		<div className="flex flex-col gap-1">
			<div
				className="flex card-container rounded-xl"
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				{/* Move */}
				<div className="flex flex-col justify-between overflow-hidden">
					{/* Move up */}
					<button
						type="button"
						className={`grow flex p-1 px-2 justify-center items-center rounded-tl-xl  ${
							isSubmitting ? "cursor-not-allowed" : "hover:bg-neutral-200"
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
						className={`grow flex p-1 px-2 justify-center items-center rounded-bl-xl ${
							isSubmitting ? "cursor-not-allowed" : "hover:bg-neutral-200"
						}`}
						onClick={() => onInstructionMove(index, 1)}
						disabled={isSubmitting}
					>
						<ChevronDown size={16} />
					</button>
				</div>

				<div className="grow flex gap-2 sm:gap-3 p-2 px-3">
					{/* Text area */}
					<div
						className={`grow border p-1 sm:p-2 rounded-lg flex ${
							isFocused ? "border-neutral-200" : "border-transparent"
						}`}
					>
						<textarea
							className={`grow outline-none min-h-16 max-h-16 resize-none ${
								isSubmitting && "cursor-not-allowed"
							}`}
							placeholder="Enter your recipe instruction"
							value={value}
							onChange={(event) => {
								onInstructionEdit(index, event.target.value);
							}}
							disabled={isSubmitting}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
						/>
					</div>

					{/* Delete */}
					<button
						type="button"
						className={`self-center bg-red-400 rounded-full size-10 ${
							isSubmitting ? "cursor-not-allowed" : "hover:bg-red-500"
						} ${!isHover && !isFocused && "hidden"}
						flex justify-center items-center`}
						onClick={() => onInstructionRemove(index)}
						disabled={isSubmitting}
					>
						<Trash2 color="white" size={20} />
					</button>
				</div>
			</div>

			{/* Error */}
			{error && <p className="font-medium px-1 text-red-600">{error}</p>}
		</div>
	);
};

export default RecipeInstructionCard;
