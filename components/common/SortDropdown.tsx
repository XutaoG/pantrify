"use client";

import { SortSchema } from "@/constants";
import { useDropdown } from "@/hooks";
import { ArrowDown, ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { useState } from "react";

interface SortDropdownProps {
	selections: SortSchema[];
	onSort: (sortBy: SortSchema) => void;
	className?: string;
}

const SortDropdown = ({ selections, onSort, className }: SortDropdownProps) => {
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

	const handleSortSelectionClick = (selection: SortSchema) => {
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
				{selection.name === currentSortSelection.name && (
					<div className={`${selection.isAscending && "rotate-180"}`}>
						<ArrowDown size={20} className="text-neutral-600" />
					</div>
				)}
			</button>
		);
	});

	return (
		<div className="flex justify-center items-center relative select-none" ref={containerRef}>
			<button
				type="button"
				className={`card-container p-1.5 md:px-4 md:py-2
				flex gap-2 justify-center items-center rounded-full  ${
					isExpanded ? "text-neutral-800 border-neutral-200" : "text-neutral-400"
				} ${className}`}
				onClick={onToggle}
			>
				<p className="hidden md:block tracking-wide text-nowrap">
					{currentSortSelection.name}
				</p>
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

export default SortDropdown;
