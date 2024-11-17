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
