"use client";

import { ingredientQuantityFractions, ingredientQuantityUnits } from "@/constants";
import { useDropdown, useDropdownOffScreenCheck } from "@/hooks";
import { TAddRecipeIngredientSchema } from "@/types";
import { ChevronLeft, CookingPot } from "lucide-react";
import { useRef, useState } from "react";
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
		formState: { errors, isSubmitting },
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
						? "text-black font-semibold"
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
						? "text-black font-semibold"
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

	const quantityFractionRef = useRef<HTMLDivElement>(null);

	const isQuantityFractionOffScreen = useDropdownOffScreenCheck(
		quantityFractionRef,
		isExpandedFraction
	);

	const quantityUnitRef = useRef<HTMLDivElement>(null);

	const isQuantityUnitOffScreen = useDropdownOffScreenCheck(quantityUnitRef, isExpandedUnit);

	return (
		<div className={`flex flex-col gap-1 min-w-0 relative ${className}`}>
			{/* Input */}
			<div className="min-w-0 h-24 flex flex-col gap-1 card-container rounded-xl px-4 pt-2 pb-2">
				{/* Title */}
				<div className="flex items-center gap-1.5">
					<CookingPot size={16} />
					<p className="text-sm font-semibold text-neutral-600 select-none">
						Quantity (Optional)
					</p>
				</div>

				<div className="min-w-0 grow flex gap-4 items-center">
					{/* Whole field */}
					<div
						className={`min-w-0 flex gap-2 px-2 items-center border rounded-lg ${
							isQuantityWholeFocused ? "border-neutral-200" : "border-transparent"
						}`}
					>
						<input
							{...register("quantityWhole")}
							type="number"
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
						className={`grow min-w-0 flex gap-2 px-2 items-center border rounded-lg relative ${
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
						{/* {isExpandedFraction && ( */}
						<div
							className={`absolute inset-x-0 min-w-0 ${
								isExpandedFraction ? "flex" : "hidden"
							} ${
								isQuantityFractionOffScreen ? "bottom-full" : "top-full"
							} z-10 border-neutral-200
								card-container rounded-lg flex-col p-2 gap-1`}
							ref={quantityFractionRef}
						>
							{fractionQuantityOptions}
						</div>
						{/* )} */}
					</button>

					{/* Unit field */}
					<button
						type="button"
						className={`grow min-w-0 flex gap-2 px-2 items-center border rounded-lg relative ${
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
						<div
							className={`absolute min-w-0 inset-x-0 ${
								isExpandedUnit ? "flex" : "hidden"
							} ${
								isQuantityUnitOffScreen ? "bottom-full" : "top-full"
							} z-10 card-container 
								h-64 p-2 border-neutral-200 rounded-lg flex-col`}
							ref={quantityUnitRef}
						>
							<div className="grow flex flex-col pr-2 gap-1 overflow-y-scroll">
								{quantityUnitOptions}
							</div>
						</div>
					</button>
				</div>
			</div>

			{/* Error */}
			{errors.quantityWhole && (
				<p className="px-1 text-red-600">{errors.quantityWhole.message}</p>
			)}
		</div>
	);
};

export default RecipeIngredientQuantityInput;
