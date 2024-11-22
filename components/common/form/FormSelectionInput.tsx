"use client";

import { useDropdown } from "@/hooks";
import { FormSelectionInputProps } from "@/types";
import { ChevronUp } from "lucide-react";
import { forwardRef } from "react";

const FormSelectionInput = forwardRef<HTMLInputElement, FormSelectionInputProps>(
	(
		{
			header,
			headerIcon,
			currentSelection,
			selections,
			onSelectionChange,
			className,
			disabled,
			...rest
		},
		ref
	) => {
		const [containerRef, isExpanded, onToggle] = useDropdown<HTMLDivElement>();

		const options = selections.map((selection) => {
			return (
				<div
					key={selection}
					className={`p-2 hover:bg-neutral-200 rounded-lg cursor-pointer ${
						selection === currentSelection
							? "text-black font-bold"
							: "text-neutral-600 font-medium"
					}`}
					onClick={() => {
						onSelectionChange(selection);
						onToggle();
					}}
				>
					{selection}
				</div>
			);
		});

		return (
			<div className={`flex flex-col gap-1 min-w-0 relative ${className}`} ref={containerRef}>
				{/* Input */}
				<div
					className={`h-20 flex flex-col gap-1 card-container rounded-xl px-4 py-2 ${
						isExpanded && "border-neutral-200"
					}`}
				>
					{/* Title */}
					<div className="flex items-center gap-1.5">
						{headerIcon}
						<p className="text-sm font-semibold text-neutral-600 select-none">
							{header}
						</p>
					</div>

					<button
						type="button"
						className={`grow flex items-center ${disabled && "cursor-not-allowed"}`}
						onClick={onToggle}
						disabled={disabled}
					>
						{/* Input */}
						<input
							{...rest}
							ref={ref}
							className={`grow py-1 bg-transparent outline-none min-w-0 cursor-pointer ${
								disabled && "cursor-not-allowed"
							}`}
							readOnly
						/>

						<div className={`${isExpanded && "rotate-180"}`}>
							<ChevronUp size={20} />
						</div>
					</button>
				</div>

				{/* Options */}
				{isExpanded && (
					<div
						className="absolute inset-x-0 top-full max-h-60 card-container border-neutral-200
						rounded-xl z-10 flex flex-col p-2 gap-1"
					>
						{options}
					</div>
				)}
			</div>
		);
	}
);

FormSelectionInput.displayName = "FormSelectionInput";

export default FormSelectionInput;
