"use client";

import { useDropdown } from "@/hooks";
import { FormSelectionInputProps } from "@/types";
import { ChevronUp } from "lucide-react";
import { forwardRef } from "react";

const FormSelectionInput = forwardRef<HTMLInputElement, FormSelectionInputProps>(
	(
		{ header, headerIcon, currentSelection, selections, onSelectionChange, className, ...rest },
		ref
	) => {
		const [containerRef, isExpanded, onToggle] = useDropdown<HTMLDivElement>();

		const options = selections.map((selection) => {
			return (
				<div
					key={selection}
					className={`p-2 hover:bg-neutral-300 rounded cursor-pointer select-none ${
						selection === currentSelection
							? "text-black font-bold"
							: "text-neutral-600 font-medium"
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
					className="h-20 flex flex-col gap-1 bg-neutral-100 border border-neutral-200 
					rounded px-4 py-2"
				>
					{/* Title */}
					<div className="flex items-center gap-1.5">
						{headerIcon}
						<p className="text-sm font-semibold text-neutral-600 select-none">
							{header}
						</p>
					</div>

					<div className="grow flex items-center" onClick={onToggle}>
						{/* Input */}
						<input
							{...rest}
							ref={ref}
							className="grow py-1 bg-transparent outline-none min-w-0"
							readOnly
						/>

						<button className={`cursor-pointer ${isExpanded && "rotate-180"}`}>
							<ChevronUp size={20} />
						</button>
					</div>
				</div>

				{/* Options */}
				{isExpanded && (
					<div
						className="max-h-60 bg-neutral-100 border border-neutral-200 
						rounded absolute inset-x-0 top-full z-10 flex flex-col p-2 gap-1"
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
