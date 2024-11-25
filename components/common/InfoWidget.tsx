"use client";

import { ReactNode } from "react";

interface InfoWidgetProps {
	icon: ReactNode;
	iconColor: string;
	text: string;
	onClick?: () => void;
	onHover?: () => void;
}

const InfoWidget = ({ icon, iconColor, text, onClick, onHover }: InfoWidgetProps) => {
	return (
		<div
			className={`flex flex-col gap-1 justify-center items-center w-20
			rounded-sm ${(onClick || onHover) && "cursor-pointer"}`}
			onClick={onClick}
			onMouseOver={onHover}
		>
			<div className={iconColor}>{icon}</div>
			<p className="text-xs text-neutral-600 font-semibold text-nowrap">{text}</p>
		</div>
	);
};

export default InfoWidget;
