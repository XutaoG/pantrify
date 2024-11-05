"use client";

import { ToolTipProps } from "@/types";
import { useState } from "react";

const ToolTipContainer = ({ children, toolTipContent }: ToolTipProps) => {
	const [showToolTip, setShowToolTip] = useState(false);

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
					className="absolute top-full right-0 bg-black/90 text-white text-nowrap 
					py-0.5 px-2 rounded select-none"
				>
					{toolTipContent}
				</div>
			)}
		</div>
	);
};

export default ToolTipContainer;
