"use client";

import { ingredientQuantityFractions, ingredientQuantityUnits } from "@/constants";
import { useDropdown } from "@/hooks";
import { FormQuantityInputProps } from "@/types";
import { MdArrowLeft } from "react-icons/md";

// const FormQuantityInput = forwardRef<HTMLInputElement, FormQuantityInputProps>(
// 	(
// 		{
// 			className,
// 			isSubmitting,
// 			quantityWholeRegister,
// 			quantityFractionRegister,
// 		},
// 		ref
// 	) => {

const FormQuantityInput = ({
	className,
	isSubmitting,
	// quantityWholeRegister,
	// quantityFractionRegister,
	register,
	currentQuantityFractionSelection,
	onQuantityFractionSelectionChange,
	currentQuantityUnitSelection,
	onQuantityUnitSelectionChange,
}: FormQuantityInputProps) => {
	const [fractionContainerRef, isExpandedFraction, onToggleFraction] = useDropdown<HTMLInputElement>();

	const [unitContainerRef, isExpandedUnit, onToggleUnit] = useDropdown<HTMLInputElement>();

	const fractionQuantityOptions = ingredientQuantityFractions.map((selection) => {
		return (
			<div
				key={selection}
				className={`p-2 hover:bg-neutral-300 rounded cursor-pointer select-none ${
					selection === currentQuantityFractionSelection
						? "text-black font-bold"
						: "text-neutral-600 font-medium"
				}`}
				onClick={() => {
					onQuantityFractionSelectionChange(selection);
				}}
			>
				{selection}
			</div>
		);
	});

	const quantityUnitOptions = ingredientQuantityUnits.map((selection) => {
		return (
			<div
				key={selection}
				className={`p-1 hover:bg-neutral-300 rounded cursor-pointer select-none ${
					selection === currentQuantityUnitSelection ? "text-black font-bold" : "text-neutral-600 font-medium"
				}`}
				onClick={() => {
					onQuantityUnitSelectionChange(selection);
				}}
			>
				{selection}
			</div>
		);
	});

	return (
		<div className={`flex flex-col gap-1 min-w-0 relative ${className}`}>
			{/* Input */}
			<div
				className="flex flex-col gap-1 bg-neutral-100 border border-neutral-200 
					rounded shadow-md px-4 pt-2 pb-4"
			>
				{/* Title */}
				<p className="text-sm font-semibold text-neutral-600 select-none">Quantity</p>

				<div className="flex gap-2 items-center">
					{/* Whole field */}
					<div className="flex gap-2 px-1 items-center bg-white border border-neutral-200 rounded">
						<input
							{...register("quantityWhole")}
							disabled={isSubmitting}
							className="w-16 py-1 bg-transparent outline-none min-w-0"
							placeholder="1"
						/>
					</div>
					{/* fraction field */}
					<div
						className="flex gap-2 px-1 items-center bg-white border border-neutral-200 rounded relative"
						ref={fractionContainerRef}
					>
						<input
							{...register("quantityFraction")}
							className="w-12 py-1 bg-transparent outline-none min-w-0 cursor-pointer"
							onClick={onToggleFraction}
							readOnly
							placeholder="1/2"
						/>
						<MdArrowLeft className="text-lg cursor-pointer" onClick={onToggleFraction} />
						{isExpandedFraction && (
							<div
								className="bg-neutral-100 border border-neutral-200 
								rounded shadow-md absolute inset-x-0 top-full z-10 flex flex-col p-2 gap-1"
							>
								{fractionQuantityOptions}
							</div>
						)}
					</div>
					{/* Unit field */}
					<div
						className="flex gap-2 px-1 items-center bg-white border border-neutral-200 rounded relative"
						ref={unitContainerRef}
					>
						<input
							{...register("quantityUnit")}
							className="w-20 py-1 bg-transparent outline-none min-w-0 cursor-pointer"
							onClick={onToggleUnit}
							placeholder="Unit"
							readOnly
						/>
						<MdArrowLeft className="text-lg cursor-pointer" onClick={onToggleUnit} />
						{isExpandedUnit && (
							<div
								className="h-64 bg-neutral-100 border border-neutral-200 
								rounded shadow-md absolute inset-x-0 top-full z-10 flex flex-col p-2 gap-1 overflow-scroll"
							>
								{quantityUnitOptions}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

FormQuantityInput.displayName = "FormQuantityInput";

export default FormQuantityInput;
