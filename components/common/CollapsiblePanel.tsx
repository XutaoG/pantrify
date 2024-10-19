"use client";

import { CollapsiblePanelProps } from "@/types";
import { useState } from "react";
import { MdOutlineExpandCircleDown } from "react-icons/md";

const CollapsiblePanel = ({
	children,
	title,
	titleStyle,
}: CollapsiblePanelProps) => {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<section className="flex flex-col gap-2">
			{/* Title */}
			<div className="flex items-center gap-4">
				<p className={`font-semibold ${titleStyle}`}>{title}</p>
				<div className="bg-neutral-200 h-0.5 grow" />
				<MdOutlineExpandCircleDown
					className="text-neutral-200 text-xl hover:text-neutral-400 cursor-pointer"
					onClick={() => {
						setIsExpanded((val) => !val);
					}}
				/>
			</div>

			{/* content */}
			{isExpanded && children}
		</section>
	);
};

export default CollapsiblePanel;
