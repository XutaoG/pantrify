"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
	pageSize: number;
	totalCount: number;
	currentPageNumber: number;
	setCurrentPageNumber: (pageNumber: number) => void;
}

const Pagination = ({
	pageSize,
	totalCount,
	currentPageNumber,
	setCurrentPageNumber,
}: PaginationProps) => {
	const totalPages = Math.ceil(totalCount / pageSize);

	const pages: number[] = [];

	// * Add to pages
	for (let i = currentPageNumber - 2; i <= currentPageNumber + 2; i++) {
		if (i > 0 && i <= totalPages) {
			pages.push(i);
		}
	}

	const moveToPage = (pageNumber: number) => {
		if (pageNumber > 0 && pageNumber <= totalPages) {
			setCurrentPageNumber(pageNumber);
		}
	};

	const moveToPrevPage = () => {
		if (currentPageNumber - 1 > 0) {
			setCurrentPageNumber(currentPageNumber - 1);
		}
	};

	const moveToNextPage = () => {
		if (currentPageNumber + 1 <= totalPages) {
			setCurrentPageNumber(currentPageNumber + 1);
		}
	};

	const moveToFirstPage = () => {
		setCurrentPageNumber(1);
	};

	const moveToLastPage = () => {
		setCurrentPageNumber(totalPages);
	};

	const pageNumbers = pages.map((pageNumber) => {
		return (
			<button
				type="button"
				key={pageNumber}
				className={`aspect-square flex justify-center items-center rounded-full ${
					pageNumber === currentPageNumber
						? "bg-sky-600 text-white"
						: "text-neutral-600 hover:bg-neutral-200"
				}`}
				onClick={() => moveToPage(pageNumber)}
			>
				{pageNumber}
			</button>
		);
	});

	return (
		<section className="flex justify-center py-8">
			<div className="h-7 sm:h-8 flex gap-3 sm:gap-6">
				{/* Left arrow */}
				<button
					type="button"
					className="aspect-square hover:bg-neutral-200 rounded-full
					flex justify-center items-center"
					onClick={moveToFirstPage}
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
					<ChevronRight size={18} />
				</button>

				<button
					type="button"
					className="aspect-square hover:bg-neutral-200 rounded-full
					flex justify-center items-center"
					onClick={moveToLastPage}
				>
					<ChevronsRight size={18} />
				</button>
			</div>
		</section>
	);
};

export default Pagination;
