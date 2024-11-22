"use client";

import { CollapsiblePanelProps } from "@/types";
import { CircleChevronUp } from "lucide-react";
import { useState } from "react";

const CollapsiblePanel = ({ children, title, titleStyle }: CollapsiblePanelProps) => {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<section className="flex flex-col gap-4">
			{/* Title */}
			<div className="flex items-center gap-4">
				<p className={`font-medium select-none ${titleStyle}`}>{title}</p>
				<div className="bg-neutral-300 h-0.5 grow" />
				<button
					type="button"
					className={`text-neutral-300 ${isExpanded && "rotate-180"}`}
					onClick={() => setIsExpanded((val) => !val)}
				>
					<CircleChevronUp size={20} />
				</button>
			</div>

			{/* content */}
			{isExpanded && children}
		</section>
	);
};

export default CollapsiblePanel;
