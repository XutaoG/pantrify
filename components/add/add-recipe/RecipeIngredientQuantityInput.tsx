"use client";

import { ingredientQuantityFractions, ingredientQuantityUnits } from "@/constants";
import { useDropdown } from "@/hooks";
import { FormQuantityInputProps, TAddRecipeIngredientSchema } from "@/types";
import { ChevronLeft, CookingPot } from "lucide-react";
import { useFormContext } from "react-hook-form";

const RecipeIngredientQuantityInput = ({ className }: FormQuantityInputProps) => {
	//! Dropdowns
	const [fractionContainerRef, isExpandedFraction, onToggleFraction] =
		useDropdown<HTMLButtonElement>();
	const [unitContainerRef, isExpandedUnit, onToggleUnit] = useDropdown<HTMLButtonElement>();

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
					selection === getValues("quantityUnit")
						? "text-black font-bold"
						: "text-neutral-600 font-medium"
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
				className="h-24 flex flex-col gap-1 bg-neutral-100 border border-neutral-200 
					rounded px-4 pt-2 pb-2"
			>
				{/* Title */}
				<div className="flex items-center gap-1.5">
					<CookingPot size={16} />
					<p className="text-sm font-semibold text-neutral-600 select-none">
						Quantity (Optional)
					</p>
				</div>

				<div className="grow flex gap-2 items-center">
					{/* Whole field */}
					<div className="flex gap-2 px-1 items-center bg-white border border-neutral-200 rounded">
						<input
							{...register("quantityWhole")}
							disabled={isSubmitting}
							className={`w-16 py-1.5 bg-transparent outline-none min-w-0 ${
								isSubmitting && "cursor-not-allowed"
							}`}
							placeholder="1"
						/>
					</div>

					{/* fraction field */}
					<button
						type="button"
						className={`grow flex gap-2 px-1 items-center bg-white border border-neutral-200 rounded relative ${
							isSubmitting && "cursor-not-allowed"
						}`}
						ref={fractionContainerRef}
						onClick={onToggleUnit}
						disabled={isSubmitting}
					>
						<input
							{...register("quantityFraction")}
							className={`w-12 py-1.5 bg-transparent outline-none min-w-0 cursor-pointer ${
								isSubmitting && "cursor-not-allowed"
							}`}
							readOnly
							placeholder="1/2"
						/>
						<ChevronLeft size={16} />
						{isExpandedFraction && (
							<div
								className="bg-neutral-100 border border-neutral-200 
								rounded absolute inset-x-0 top-full z-10 flex flex-col p-2 gap-1"
							>
								{fractionQuantityOptions}
							</div>
						)}
					</button>

					{/* Unit field */}
					<button
						type="button"
						className={`grow flex gap-2 px-1 items-center bg-white border border-neutral-200 rounded relative ${
							isSubmitting && "cursor-not-allowed"
						}`}
						ref={unitContainerRef}
						onClick={onToggleUnit}
						disabled={isSubmitting}
					>
						<input
							{...register("quantityUnit")}
							className={`w-20 py-1.5 bg-transparent outline-none min-w-0 cursor-pointer ${
								isSubmitting && "cursor-not-allowed"
							}`}
							placeholder="Unit"
							readOnly
						/>

						<ChevronLeft size={16} />
						{isExpandedUnit && (
							<div
								className="h-64 bg-neutral-100 border border-neutral-200 
								rounded absolute inset-x-0 top-full z-10 flex flex-col p-2 gap-1 overflow-scroll"
							>
								{quantityUnitOptions}
							</div>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default RecipeIngredientQuantityInput;
