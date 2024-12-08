"use client";

import { ReactNode, useState } from "react";

interface ToolTipProps {
	children: ReactNode;
	toolTipContent: string;
	position: "left" | "right";
}

const ToolTipContainer = ({ children, toolTipContent, position }: ToolTipProps) => {
	const [showToolTip, setShowToolTip] = useState(false);

	const positionStyle = position === "left" ? "right-0" : "left-0";

	return (
		<div className="relative">
			<div
				onMouseEnter={() => setShowToolTip(true)}
				onMouseLeave={() => setShowToolTip(false)}
			>
				{children}
			</div>
			{showToolTip && (
				<div
					className={`absolute top-full ${positionStyle} bg-black/90 text-white text-sm
					text-nowrap py-0.5 px-2 rounded-lg select-none z-10`}
				>
					{toolTipContent}
				</div>
			)}
		</div>
	);
};

export default ToolTipContainer;
