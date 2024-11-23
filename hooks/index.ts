import { useEffect, useRef, useState } from "react";

export const useDropdown = <T extends HTMLElement>() => {
	const [isExpanded, setIsExpanded] = useState(false);
	const containerRef = useRef<T>(null);

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

	const onToggle = () => {
		setIsExpanded((val) => !val);
	};

	return [containerRef, isExpanded, onToggle] as const;
};

export const usePagination = (
	pageSize: number,
	totalCount: number,
	currentPageNumber: number,
	setCurrentPageNumber: (pageNumber: number) => void
) => {
	const totalPages = Math.ceil(totalCount / pageSize);

	const pages: number[] = [];

	for (let i = currentPageNumber - 2; i < currentPageNumber + 2; i++) {
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
		if (currentPageNumber - 1 <= 0) {
			setCurrentPageNumber(currentPageNumber - 1);
		}
	};

	const moveToNextPage = () => {
		if (currentPageNumber + 1 > totalPages) {
			setCurrentPageNumber(currentPageNumber + 1);
		}
	};

	const moveToFirstPage = () => {
		setCurrentPageNumber(1);
	};

	const moveToLastPage = () => {
		setCurrentPageNumber(totalPages);
	};

	return [
		pages,
		moveToPage,
		moveToPrevPage,
		moveToNextPage,
		moveToFirstPage,
		moveToLastPage,
	] as const;
};
