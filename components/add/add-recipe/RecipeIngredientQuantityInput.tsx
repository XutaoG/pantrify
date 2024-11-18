"use client";

import { ingredientQuantityFractions, ingredientQuantityUnits } from "@/constants";
import { useDropdown } from "@/hooks";
import { FormQuantityInputProps, TAddRecipeIngredientSchema } from "@/types";
import { useFormContext } from "react-hook-form";
import { MdArrowLeft } from "react-icons/md";

const RecipeIngredientQuantityInput = ({ className }: FormQuantityInputProps) => {
	//! Dropdowns
	const [fractionContainerRef, isExpandedFraction, onToggleFraction] = useDropdown<HTMLInputElement>();
	const [unitContainerRef, isExpandedUnit, onToggleUnit] = useDropdown<HTMLInputElement>();

	const {
		register,
		formState: { isSubmitting },
		getValues,
		setValue,
	} = useFormContext<TAddRecipeIngredientSchema>();

	const fractionQuantityOptions = ingredientQuantityFractions.map((selection) => {
		return (
			<div
				key={selection}
				className={`p-2 hover:bg-neutral-300 rounded cursor-pointer select-none ${
					selection === getValues("quantityFraction")
						? "text-black font-bold"
						: "text-neutral-600 font-medium"
				}`}
				onClick={() => {
					setValue("quantityFraction", selection);
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
					selection === getValues("quantityUnit") ? "text-black font-bold" : "text-neutral-600 font-medium"
				}`}
				onClick={() => {
					setValue("quantityUnit", selection, { shouldValidate: true });
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
				className="h-20 flex flex-col gap-1 bg-neutral-100 border border-neutral-200 
					rounded shadow-md px-4 pt-2 pb-2"
			>
				{/* Title */}
				<p className="text-sm font-semibold text-neutral-600 select-none">Quantity</p>

				<div className="grow flex gap-2 items-center">
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

export default RecipeIngredientQuantityInput;
