"use client";

import { useRef, useState } from "react";
import CollapsiblePanel from "../common/CollapsiblePanel";
import { useDropdown, useDropdownOffScreenCheck } from "@/hooks";
import { ListFilter } from "lucide-react";
import {
	DifficultyFilterSchema,
	DurationFilterSchema,
	recipeDifficultyFilters,
	recipeDurationFilters,
} from "@/constants";

interface RecipeFilterDropdownProps {
	onDifficultyFilterChange: (difficulty: DifficultyFilterSchema) => void;
	onDurationFilterChange: (duration: DurationFilterSchema) => void;
	className?: string;
}

const RecipeFilterDropdown = ({
	onDifficultyFilterChange,
	onDurationFilterChange,
	className,
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
				className={`p-1.5 hover:bg-neutral-200 rounded-lg cursor-pointer text-sm ${
					filter === currentDifficultyFilter
						? "text-black font-semibold"
						: "text-neutral-600 font-medium"
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
				className={`p-1.5 hover:bg-neutral-200 rounded-lg cursor-pointer text-sm ${
					filter === currentDurationFilter
						? "text-black font-semibold"
						: "text-neutral-600 font-medium"
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

	const dropdownRef = useRef<HTMLDivElement>(null);

	const isDropdownOffScreen = useDropdownOffScreenCheck(dropdownRef, isExpanded);

	return (
		<div className="flex justify-center items-center relative select-none" ref={containerRef}>
			<button
				type="button"
				className={`card-container p-1.5 md:px-4 md:py-2
				flex gap-2 justify-center items-center rounded-full ${
					isExpanded ? "text-neutral-800 border-neutral-200" : "text-neutral-400"
				} ${className}`}
				onClick={onToggle}
			>
				<p className="hidden md:block tracking-wide">Filter</p>
				<ListFilter size={20} />
			</button>
			{/* {isExpanded && ( */}
			<div
				className={`absolute z-10 ${isExpanded ? "flex" : "hidden"} ${
					isDropdownOffScreen ? "bottom-full" : "top-full"
				} right-0 w-48 card-container p-3 
					border border-neutral-200 rounded-xl flex-col gap-3`}
				ref={dropdownRef}
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
			{/* )} */}
		</div>
	);
};

export default RecipeFilterDropdown;
