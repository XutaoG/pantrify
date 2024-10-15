"use client";

import { InfoWidgetProps } from "@/types";

const InfoWidget = ({
	icon,
	iconColor,
	text,
	onClick,
	onHover,
}: InfoWidgetProps) => {
	return (
		<div
			className={`flex flex-col gap-1 justify-center items-center h-12 w-14 
			rounded-sm ${(onClick || onHover) && "hover:bg-neutral-200 cursor-pointer"}`}
			onClick={onClick}
			onMouseOver={onHover}
		>
			<div className={`text-xl ${iconColor}`}>{icon}</div>
			<p className="text-xs text-neutral-600 font-semibold text-nowrap">
				{text}
			</p>
		</div>
	);
};

export default InfoWidget;
