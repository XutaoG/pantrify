"use client";

import { Ingredient, Recipe } from "@/types";
import { ActiveViewContext } from "./ActiveViewContext";
import { ReactNode, useState } from "react";

interface ActiveViewContextWrapperProps {
	children: ReactNode;
}

const ActiveViewContextWrapper = ({ children }: ActiveViewContextWrapperProps) => {
	const [activeView, setActiveView] = useState<Ingredient | Recipe | null>(null);

	return (
		<ActiveViewContext.Provider value={{ activeView, setActiveView }}>
			{children}
		</ActiveViewContext.Provider>
	);
};

export default ActiveViewContextWrapper;
