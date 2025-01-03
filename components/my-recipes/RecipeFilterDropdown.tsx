"use client";

import { useState } from "react";
import CollapsiblePanel from "../common/CollapsiblePanel";
import { useDropdown } from "@/hooks";
import { ListFilter } from "lucide-react";
import {
	DifficultyFilterSchema,
	DurationFilterSchema,
	recipeDifficultyFilters,
	recipeDurationFilters,
} from "@/constants";

interface RecipeFilterDropdownProps {
	// difficultyFilter: DifficultyFilterSchema;
	onDifficultyFilterChange: (difficulty: DifficultyFilterSchema) => void;
	// durationFilter: DurationFilterSchema;
	onDurationFilterChange: (duration: DurationFilterSchema) => void;
}

const RecipeFilterDropdown = ({
	onDifficultyFilterChange,
	onDurationFilterChange,
}: RecipeFilterDropdownProps) => {
	const [containerRef, isExpanded, onToggle] = useDropdown<HTMLDivElement>();

	const [currentDifficultyFilter, setCurrentDifficultyFilter] = useState(
		recipeDifficultyFilters[0]
	);

	const [currentDurationFilter, setCurrentDurationFilter] = useState(recipeDurationFilters[0]);

	const handleDifficultySelectionClick = (selection: DifficultyFilterSchema) => {
		if (selection !== currentDifficultyFilter) {
			setCurrentDifficultyFilter(selection);
		}
	};

	const difficultyFilterOptions = recipeDifficultyFilters.map((filter) => {
		return (
			<div
				key={filter.name}
				className={`p-1.5 hover:bg-neutral-200 rounded-lg cursor-pointer ${
					filter === currentDifficultyFilter
						? "text-black font-medium"
						: "text-neutral-600 font-normal"
				}`}
				onClick={() => {
					handleDifficultySelectionClick(filter);
					onDifficultyFilterChange(filter);
				}}
			>
				{filter.name}
			</div>
		);
	});

	const handleTimeSelectionClick = (selection: DurationFilterSchema) => {
		if (selection !== currentDifficultyFilter) {
			setCurrentDurationFilter(selection);
		}
	};

	const durationFilterOptions = recipeDurationFilters.map((filter) => {
		return (
			<div
				key={filter.name}
				className={`p-2 hover:bg-neutral-200 rounded-lg cursor-pointer ${
					filter === currentDurationFilter
						? "text-black font-medium"
						: "text-neutral-600 font-normal"
				}`}
				onClick={() => {
					handleTimeSelectionClick(filter);
					onDurationFilterChange(filter);
				}}
			>
				{filter.name}
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
						<div className="flex flex-col gap-0">{difficultyFilterOptions}</div>
					</CollapsiblePanel>

					{/* Time selections */}
					<CollapsiblePanel title="Duration">
						<div className="flex flex-col gap-0">{durationFilterOptions}</div>
					</CollapsiblePanel>
				</div>
			)}
		</div>
	);
};

export default RecipeFilterDropdown;
