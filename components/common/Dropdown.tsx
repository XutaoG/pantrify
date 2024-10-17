"use client";

import { useEffect, useRef, useState } from "react";
import { MdToc } from "react-icons/md";
import CollapsiblePanel from "./CollapsiblePanel";

const Dropdown = () => {
	const mockDifficultySelections = [
		"All Difficulty",
		"Easy",
		"Medium",
		"Difficult",
	];

	const mockTimeSelections = [
		"0 to 15 mins",
		"15 to 30 mins",
		"30 to 60 mins",
		"1 to 2 hrs",
		"2 hrs+",
	];

	const [currentDifficultySelection, setCurrentDifficultySelection] =
		useState(mockDifficultySelections[0]);

	const [currentTimeSelection, setCurrentTimeSelection] = useState(
		mockTimeSelections[0]
	);

	// Dropdown expansion
	const [isExpanded, setIsExpanded] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!containerRef.current) {
				return;
			}

			if (!containerRef.current.contains(event.target as Node)) {
				setIsExpanded(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const handleDifficultySelectionClick = (selection: string) => {
		if (selection !== currentDifficultySelection) {
			setCurrentDifficultySelection(selection);
		}
	};

	const difficultyDropdownOptions = mockDifficultySelections.map(
		(selection) => {
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
		}
	);

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
		// <div className="relative">
		// {/* Selection box */}
		<div
			className="h-12 flex justify-center items-center relative select-none"
			ref={containerRef}
		>
			<MdToc
				className="text-3xl text-neutral-600 cursor-pointer"
				onClick={() => setIsExpanded((val) => !val)}
			/>

			{/* Drop down box */}
			{isExpanded && (
				<div
					className="w-48 absolute right-0  top-14 z-10 bg-neutral-100 border border-neutral-200 
					p-3 py-5 rounded shadow-md flex flex-col gap-5"
				>
					{/* Difficulty selections */}
					<CollapsiblePanel title="Difficulty">
						<div className="flex flex-col gap-1">
							{difficultyDropdownOptions}
						</div>
					</CollapsiblePanel>

					{/* Time selections */}
					<CollapsiblePanel title="Time">
						<div className="flex flex-col gap-1">
							{timeDropdownOptions}
						</div>
					</CollapsiblePanel>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
