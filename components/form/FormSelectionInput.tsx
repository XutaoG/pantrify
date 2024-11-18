"use client";

import { useDropdown } from "@/hooks";
import { FormSelectionInputProps } from "@/types";
import { forwardRef } from "react";
import { MdArrowDropDown } from "react-icons/md";

const FormSelectionInput = forwardRef<HTMLInputElement, FormSelectionInputProps>(
	({ title, currentSelection, selections, isSubmitting, onSelectionChange, className, ...rest }, ref) => {
		const [containerRef, isExpanded, onToggle] = useDropdown<HTMLDivElement>();

		const options = selections.map((selection) => {
			return (
				<div
					key={selection}
					className={`p-2 hover:bg-neutral-300 rounded cursor-pointer select-none ${
						selection === currentSelection ? "text-black font-bold" : "text-neutral-600 font-medium"
					}`}
					onClick={() => {
						onSelectionChange(selection);
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
					className="flex flex-col gap-0 bg-neutral-100 border border-neutral-200 
					rounded shadow-md px-4 pt-2"
				>
					{/* Title */}
					<p className="text-sm font-semibold text-neutral-600 select-none cursor-pointer">{title}</p>

					<div className="flex items-center" onClick={onToggle}>
						{/* Input */}
						<input
							{...rest}
							ref={ref}
							disabled={isSubmitting}
							className="grow py-2 bg-transparent outline-none focus:bg-transparent min-w-0"
							readOnly
						/>
						<MdArrowDropDown className={`text-lg cursor-pointer ${!isExpanded && "rotate-90"}`} />
					</div>
				</div>

				{/* Options */}
				{isExpanded && (
					<div
						className="max-h-60 bg-neutral-100 border border-neutral-200 
						rounded shadow-md absolute inset-x-0 top-full z-10 flex flex-col p-2 gap-1"
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
