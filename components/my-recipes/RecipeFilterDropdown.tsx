"use client";

import { useState } from "react";
import CollapsiblePanel from "../common/CollapsiblePanel";
import { useDropdown } from "@/hooks";
import { List } from "lucide-react";

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
				className={`p-2 hover:bg-neutral-300 rounded cursor-pointer ${
					selection === currentDifficultySelection
						? "text-black font-bold"
						: "text-neutral-600 font-medium"
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
				className={`p-2 hover:bg-neutral-300 rounded cursor-pointer ${
					selection === currentTimeSelection
						? "text-black font-bold"
						: "text-neutral-600 font-medium"
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
				className="h-12 bg-neutral-100 border border-neutral-200 aspect-square 
				flex justify-center items-center rounded"
				onClick={onToggle}
			>
				<List size={20} />
			</button>
			{isExpanded && (
				<div
					className="absolute z-10 top-14 right-0 w-48 bg-neutral-100 border border-neutral-200 
					p-3 py-5 rounded flex flex-col gap-5"
				>
					{/* Difficulty selections */}
					<CollapsiblePanel title="Difficulty">
						<div className="flex flex-col gap-1">{difficultyDropdownOptions}</div>
					</CollapsiblePanel>

					{/* Time selections */}
					<CollapsiblePanel title="Time">
						<div className="flex flex-col gap-1">{timeDropdownOptions}</div>
					</CollapsiblePanel>
				</div>
			)}
		</div>
	);
};

export default RecipeFilterDropdown;
