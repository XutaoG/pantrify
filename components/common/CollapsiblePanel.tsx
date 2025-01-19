"use client";

import { CircleChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";

interface CollapsiblePanelProps {
	title: string;
	children: ReactNode;
	titleStyle?: string;
}

const CollapsiblePanel = ({ children, title, titleStyle }: CollapsiblePanelProps) => {
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<section className="flex flex-col gap-2 sm:gap-4">
			{/* Title */}
			<div className="flex items-center gap-4">
				<p className={`font-medium select-none ${titleStyle} tracking-wide`}>{title}</p>
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
