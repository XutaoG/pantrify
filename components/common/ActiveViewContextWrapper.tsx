"use client";

import { ActiveViewContextWrapperProps, Ingredient, Recipe } from "@/types";
import { ActiveViewContext } from "./ActiveViewContext";
import { useState } from "react";

const ActiveViewContextWrapper = ({ children }: ActiveViewContextWrapperProps) => {
	const [activeView, setActiveView] = useState<Ingredient | Recipe | null>(null);

	return (
		<ActiveViewContext.Provider value={{ activeView, setActiveView }}>
			{children}
		</ActiveViewContext.Provider>
	);
};

export default ActiveViewContextWrapper;
