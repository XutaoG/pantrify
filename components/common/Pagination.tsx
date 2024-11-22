"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

const Pagination = () => {
	const mockPageNumbers = ["8", "9", "10"];

	const [currentPageNumberIndex, setCurrentPageNumberIndex] = useState(0);

	const pageNumbers = mockPageNumbers.map((pageNumber, index) => {
		return (
			<button
				type="button"
				key={pageNumber}
				className={`aspect-square flex justify-center items-center rounded-full  ${
					pageNumber === mockPageNumbers[currentPageNumberIndex]
						? "bg-sky-600 text-white"
						: "text-neutral-600 hover:bg-neutral-200"
				}`}
				onClick={() => setCurrentPageNumberIndex(index)}
			>
				{pageNumber}
			</button>
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
		<div className="h-8 flex gap-6">
			{/* Left arrow */}
			<button
				type="button"
				className="aspect-square hover:bg-neutral-200 rounded-full
				flex justify-center items-center"
				onClick={() => setCurrentPageNumberIndex(0)}
			>
				<ChevronsLeft size={18} />
			</button>

			<button
				type="button"
				className="aspect-square hover:bg-neutral-200 rounded-full
				flex justify-center items-center"
				onClick={moveToPrevPage}
			>
				<ChevronLeft size={18} />
			</button>

			{/* Page numbers */}
			{pageNumbers}

			{/* Right arrow */}
			<button
				type="button"
				className="aspect-square hover:bg-neutral-200 rounded-full
				flex justify-center items-center"
				onClick={moveToNextPage}
			>
				<ChevronsRight size={18} />
			</button>

			<button
				type="button"
				className="aspect-square hover:bg-neutral-200 rounded-full
				flex justify-center items-center"
				onClick={() => setCurrentPageNumberIndex(mockPageNumbers.length - 1)}
			>
				<ChevronRight size={18} />
			</button>
		</div>
	);
};

export default Pagination;
