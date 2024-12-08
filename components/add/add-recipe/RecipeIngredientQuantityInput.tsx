"use client";

import { ingredientQuantityFractions, ingredientQuantityUnits } from "@/constants";
import { useDropdown } from "@/hooks";
import { TAddRecipeIngredientSchema } from "@/types";
import { ChevronLeft, CookingPot } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormQuantityInputProps {
	className?: string;
}

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

	//! Focus
	const [isQuantityWholeFocused, setIsQuantityWholeFocused] = useState(false);

	const fractionQuantityOptions = ingredientQuantityFractions.map((selection) => {
		return (
			<div
				key={selection}
				className={`p-1 hover:bg-neutral-200 rounded-lg cursor-pointer ${
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
				className={`p-1 hover:bg-neutral-200 rounded-lg cursor-pointer ${
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
			<div className="h-24 flex flex-col gap-1 card-container rounded-xl px-4 pt-2 pb-2">
				{/* Title */}
				<div className="flex items-center gap-1.5">
					<CookingPot size={16} />
					<p className="text-sm font-semibold text-neutral-600 select-none">
						Quantity (Optional)
					</p>
				</div>

				<div className="grow flex gap-4 items-center">
					{/* Whole field */}
					<div
						className={`flex gap-2 px-2 items-center border rounded-lg ${
							isQuantityWholeFocused ? "border-neutral-200" : "border-transparent"
						}`}
					>
						<input
							{...register("quantityWhole")}
							disabled={isSubmitting}
							className={`w-12 py-1.5 bg-transparent outline-none min-w-0 ${
								isSubmitting && "cursor-not-allowed"
							}`}
							placeholder="1"
							onFocus={() => setIsQuantityWholeFocused(true)}
							onBlur={() => setIsQuantityWholeFocused(false)}
						/>
					</div>

					{/* fraction field */}
					<button
						type="button"
						className={`grow flex gap-2 px-2 items-center border rounded-lg relative ${
							isSubmitting && "cursor-not-allowed"
						} ${isExpandedFraction ? "border-neutral-200" : "border-transparent"}`}
						ref={fractionContainerRef}
						onClick={onToggleFraction}
						disabled={isSubmitting}
					>
						<input
							{...register("quantityFraction")}
							className={`w-12 py-1.5 outline-none min-w-0 cursor-pointer ${
								isSubmitting && "cursor-not-allowed"
							}`}
							readOnly
							placeholder="1/2"
						/>
						<ChevronLeft size={16} />
						{isExpandedFraction && (
							<div
								className="absolute inset-x-0 top-full z-10 border-neutral-200
								card-container rounded-lg flex flex-col p-2 gap-1"
							>
								{fractionQuantityOptions}
							</div>
						)}
					</button>

					{/* Unit field */}
					<button
						type="button"
						className={`grow flex gap-2 px-2 items-center border rounded-lg relative ${
							isSubmitting && "cursor-not-allowed"
						} ${isExpandedUnit ? "border-neutral-200" : "border-transparent"}`}
						ref={unitContainerRef}
						onClick={onToggleUnit}
						disabled={isSubmitting}
					>
						<input
							{...register("quantityUnit")}
							className={`w-20 py-1.5 outline-none min-w-0 cursor-pointer ${
								isSubmitting && "cursor-not-allowed"
							}`}
							placeholder="Unit"
							readOnly
						/>

						<ChevronLeft size={16} />
						{isExpandedUnit && (
							<div
								className="absolute inset-x-0 top-full z-10 card-container 
								h-64 p-2 border-neutral-200 rounded-lg flex flex-col"
							>
								<div className="grow flex flex-col pr-2 gap-1 overflow-y-scroll">
									{quantityUnitOptions}
								</div>
							</div>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default RecipeIngredientQuantityInput;
