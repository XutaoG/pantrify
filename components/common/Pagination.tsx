"use client";

import { useState } from "react";
import {
	MdChevronLeft,
	MdChevronRight,
	MdKeyboardDoubleArrowLeft,
	MdKeyboardDoubleArrowRight,
} from "react-icons/md";

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
			<MdKeyboardDoubleArrowLeft
				className="text-xl text-neutral-600 cursor-pointer"
				onClick={() => setCurrentPageNumberIndex(0)}
			/>
			<MdChevronLeft
				className="text-xl text-neutral-600 cursor-pointer"
				onClick={moveToPrevPage}
			/>
			{/* Page numbers */}
			{pageNumbers}
			{/* Right arrow */}
			<MdChevronRight
				className="text-xl text-neutral-600 cursor-pointer"
				onClick={moveToNextPage}
			/>
			<MdKeyboardDoubleArrowRight
				className="text-xl text-neutral-600 cursor-pointer"
				onClick={() =>
					setCurrentPageNumberIndex(mockPageNumbers.length - 1)
				}
			/>
		</div>
	);
};

export default Pagination;
