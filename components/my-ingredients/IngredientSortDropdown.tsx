"use client";

import { useState } from "react";
import { useDropdown } from "@/hooks";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { IngredientSortSchema } from "@/constants";
import { IngredientSortByProps } from "@/types";

const IngredientSortDropdown = ({ selections, onSort }: IngredientSortByProps) => {
	const [containerRef, isExpanded, onToggle] = useDropdown<HTMLDivElement>();

	//* Store current sort option
	const [currentSortSelection, setCurrentSortSeletion] = useState(selections[0]);
	//* Store sort orders
	const [currentSortSchema, setCurrentSortSchema] = useState(selections);

	// Get sort order
	let currentSortOrder: boolean = false;
	currentSortSchema.forEach((selection) => {
		if (selection.name == currentSortSelection.name) {
			currentSortOrder = selection.isAscending;
		}
	});

	const handleSortSelectionClick = (selection: IngredientSortSchema) => {
		if (selection.name === currentSortSelection.name) {
			// Same selection, update sort order

			const updatedSortSchema = currentSortSchema.map((selection) => {
				if (selection.name == currentSortSelection.name) {
					return {
						...selection,
						isAscending: !selection.isAscending,
					};
				}
				return selection;
			});

			setCurrentSortSchema(updatedSortSchema);

			// Sort
			onSort({
				...selection,
				isAscending: !selection.isAscending,
			});
		} else {
			// Different selection, update selection

			setCurrentSortSeletion(selection);

			// Sort
			onSort(selection);
		}
	};

	const dropdownOptions = currentSortSchema.map((selection) => {
		return (
			<button
				type="button"
				key={selection.name}
				className={`p-2 hover:bg-neutral-200 rounded-lg 
				flex justify-between items-center  ${
					selection.name === currentSortSelection.name
						? "text-black font-medium"
						: "text-neutral-600 font-normal"
				}`}
				onClick={() => handleSortSelectionClick(selection)}
			>
				{selection.name}
				{/* {selection.name === currentSortSelection.name &&
					(selection.isAscending ? (
						<ArrowUpNarrowWide className="text-neutral-600" size={20} />
					) : (
						<ArrowDownNarrowWide className="text-neutral-600" size={20} />
					))} */}
			</button>
		);
	});

	return (
		<div className="flex justify-center items-center relative select-none" ref={containerRef}>
			<button
				type="button"
				className={`h-10 card-container aspect-square px-4
				flex gap-2 justify-center items-center rounded-full  ${
					isExpanded ? "text-neutral-800 border-neutral-200" : "text-neutral-400"
				}`}
				onClick={onToggle}
			>
				<p className="tracking-wide text-nowrap">{currentSortSelection.name}</p>
				{currentSortOrder ? (
					<ArrowUpNarrowWide size={20} />
				) : (
					<ArrowDownNarrowWide size={20} />
				)}
			</button>
			{isExpanded && (
				<div
					className="absolute z-10 top-12 right-0 w-48 card-container p-3 
					border border-neutral-200 rounded-xl"
				>
					<div className="flex flex-col gap-0">{dropdownOptions}</div>
				</div>
			)}
		</div>
	);
};

export default IngredientSortDropdown;
