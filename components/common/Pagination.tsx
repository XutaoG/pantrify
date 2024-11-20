"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

const Pagination = () => {
	const mockPageNumbers = ["8", "9", "10"];

	const [currentPageNumberIndex, setCurrentPageNumberIndex] = useState(0);

	const pageNumbers = mockPageNumbers.map((pageNumber, index) => {
		return (
			<div
				key={pageNumber}
				className={`size-7 flex justify-center items-center rounded cursor-pointer ${
					pageNumber === mockPageNumbers[currentPageNumberIndex]
						? "bg-sky-600 text-white"
						: "text-neutral-600"
				}`}
				onClick={() => setCurrentPageNumberIndex(index)}
			>
				{pageNumber}
			</div>
		);
	});

	const moveToPrevPage = () => {
		if (currentPageNumberIndex !== 0) {
			setCurrentPageNumberIndex(currentPageNumberIndex - 1);
		}
	};

	const moveToNextPage = () => {
		if (currentPageNumberIndex !== mockPageNumbers.length - 1) {
			setCurrentPageNumberIndex(currentPageNumberIndex + 1);
		}
	};

	return (
		<div className="flex gap-6 items-center">
			{/* Left arrow */}
			<button onClick={() => setCurrentPageNumberIndex(0)}>
				<ChevronsLeft size={18} />
			</button>

			<button onClick={moveToPrevPage}>
				<ChevronLeft size={18} />
			</button>

			{/* Page numbers */}
			{pageNumbers}

			{/* Right arrow */}
			<button onClick={moveToNextPage}>
				<ChevronsRight size={18} />
			</button>

			<button onClick={() => setCurrentPageNumberIndex(mockPageNumbers.length - 1)}>
				<ChevronRight size={18} />
			</button>
		</div>
	);
};

export default Pagination;
