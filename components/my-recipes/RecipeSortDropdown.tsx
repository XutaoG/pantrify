"use client";

import { useState } from "react";
import { useDropdown } from "@/hooks";
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";

const RecipeSortDropdown = () => {
	const [containerRef, isExpanded, onToggle] = useDropdown<HTMLDivElement>();

	const mockSortSelections = [
		{
			name: "Date added",
			isAscending: false,
		},
		{
			name: "Name",
			isAscending: true,
		},
		{
			name: "Duration",
			isAscending: true,
		},
		{
			name: "Difficulty",
			isAscending: true,
		},
	];

	const [currentSortSelection, setCurrentSortSeletion] = useState(mockSortSelections[0].name);
	const [currentSortOrder, setCurrentSortOrder] = useState(mockSortSelections);

	const handleSortSelectionClick = (selection: { name: string; isAscending: boolean }) => {
		if (selection.name === currentSortSelection) {
			// Same selection, update sort order

			const updatedSortOrder = currentSortOrder.map((selection) => {
				if (selection.name == currentSortSelection) {
					return {
						name: selection.name,
						isAscending: !selection.isAscending,
					};
				}
				return selection;
			});

			setCurrentSortOrder(updatedSortOrder);
		} else {
			// Different selection, update selection

			setCurrentSortSeletion(selection.name);
		}
	};

	const dropdownOptions = currentSortOrder.map((selection) => {
		return (
			<div
				key={selection.name}
				className={`p-2 hover:bg-neutral-200 rounded-lg cursor-pointer 
				flex justify-between items-center  ${
					selection.name === currentSortSelection
						? "text-black font-medium"
						: "text-neutral-600 font-normal"
				}`}
				onClick={() => handleSortSelectionClick(selection)}
			>
				{selection.name}
				{selection.name === currentSortSelection &&
					(selection.isAscending ? (
						<ArrowUpNarrowWide className="text-neutral-600" size={20} />
					) : (
						<ArrowDownNarrowWide className="text-neutral-600" size={20} />
					))}
			</div>
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
				<p className="tracking-wide">Sort</p>
				<ArrowDownWideNarrow size={20} />
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

export default RecipeSortDropdown;
