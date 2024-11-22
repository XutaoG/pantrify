"use client";

import { useState } from "react";
import CollapsiblePanel from "../common/CollapsiblePanel";
import { useDropdown } from "@/hooks";
import { ListFilter } from "lucide-react";

const RecipeFilterDropdown = () => {
	const [containerRef, isExpanded, onToggle] = useDropdown<HTMLDivElement>();

	const mockDifficultySelections = ["All Difficulty", "Easy", "Medium", "Difficult"];

	const mockTimeSelections = [
		"0 to 15 mins",
		"15 to 30 mins",
		"30 to 60 mins",
		"1 to 2 hrs",
		"2 hrs+",
	];

	const [currentDifficultySelection, setCurrentDifficultySelection] = useState(
		mockDifficultySelections[0]
	);

	const [currentTimeSelection, setCurrentTimeSelection] = useState(mockTimeSelections[0]);

	const handleDifficultySelectionClick = (selection: string) => {
		if (selection !== currentDifficultySelection) {
			setCurrentDifficultySelection(selection);
		}
	};

	const difficultyDropdownOptions = mockDifficultySelections.map((selection) => {
		return (
			<div
				key={selection}
				className={`p-1.5 hover:bg-neutral-200 rounded-lg cursor-pointer ${
					selection === currentDifficultySelection
						? "text-black font-medium"
						: "text-neutral-600 font-normal"
				}`}
				onClick={() => {
					handleDifficultySelectionClick(selection);
				}}
			>
				{selection}
			</div>
		);
	});

	const handleTimeSelectionClick = (selection: string) => {
		if (selection !== currentDifficultySelection) {
			setCurrentTimeSelection(selection);
		}
	};

	const timeDropdownOptions = mockTimeSelections.map((selection) => {
		return (
			<div
				key={selection}
				className={`p-2 hover:bg-neutral-200 rounded-lg cursor-pointer ${
					selection === currentTimeSelection
						? "text-black font-medium"
						: "text-neutral-600 font-normal"
				}`}
				onClick={() => {
					handleTimeSelectionClick(selection);
				}}
			>
				{selection}
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
				<p className="tracking-wide">Filter</p>
				<ListFilter size={20} />
			</button>
			{isExpanded && (
				<div
					className="absolute z-10 top-12 right-0 w-48 card-container p-3 
					border border-neutral-200 rounded-xl flex flex-col gap-5"
				>
					{/* Difficulty selections */}
					<CollapsiblePanel title="Difficulty">
						<div className="flex flex-col gap-0">{difficultyDropdownOptions}</div>
					</CollapsiblePanel>

					{/* Time selections */}
					<CollapsiblePanel title="Time">
						<div className="flex flex-col gap-0">{timeDropdownOptions}</div>
					</CollapsiblePanel>
				</div>
			)}
		</div>
	);
};

export default RecipeFilterDropdown;
