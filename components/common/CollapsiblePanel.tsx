"use client";

import { CollapsiblePanelProps } from "@/types";
import { CircleChevronUp } from "lucide-react";
import { useState } from "react";

const CollapsiblePanel = ({ children, title, titleStyle }: CollapsiblePanelProps) => {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<section className="flex flex-col gap-2">
			{/* Title */}
			<div className="flex items-center gap-4">
				<p className={`font-semibold ${titleStyle}`}>{title}</p>
				<div className="bg-neutral-200 h-0.5 grow" />
				<button
					type="button"
					className={`cursor-pointer ${isExpanded && "rotate-180"} text-neutral-600`}
					onClick={() => setIsExpanded((val) => !val)}
				>
					<CircleChevronUp size={18} />
				</button>
			</div>

			{/* content */}
			{isExpanded && children}
		</section>
	);
};

export default CollapsiblePanel;
