"use client";

import { ReactNode } from "react";

interface InfoWidgetProps {
	icon: ReactNode;
	iconColor: string;
	text: string;
	onClick?: () => void;
	onHover?: () => void;
	small?: boolean;
}

const InfoWidget = ({ icon, iconColor, text, onClick, onHover, small }: InfoWidgetProps) => {
	return (
		<div
			className={`flex flex-col gap-1 justify-center items-center 
			rounded-sm ${(onClick || onHover) && "cursor-pointer"} ${small ? "w-12" : "w-24"}`}
			onClick={onClick}
			onMouseOver={onHover}
		>
			<div className={iconColor}>{icon}</div>
			<p className="text-xs text-neutral-600 font-semibold text-nowrap">{text}</p>
		</div>
	);
};

export default InfoWidget;
