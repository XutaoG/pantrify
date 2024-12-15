"use client";

import { Ingredient, Recipe } from "@/types";
import { ActiveViewContext } from "./ActiveViewContext";
import { ReactNode, useState } from "react";
import { RefreshContext } from "./FetchContext";
import { useRefresh } from "@/hooks";

interface ActiveViewContextWrapperProps {
	children: ReactNode;
}

const ActiveViewContextWrapper = ({ children }: ActiveViewContextWrapperProps) => {
	const [activeView, setActiveView] = useState<Ingredient | Recipe | null>(null);
	const [refreshValue, refresh] = useRefresh();

	return (
		<ActiveViewContext.Provider value={{ activeView, setActiveView }}>
			<RefreshContext.Provider value={{ refreshValue, refresh }}>
				{children}
			</RefreshContext.Provider>
		</ActiveViewContext.Provider>
	);
};

export default ActiveViewContextWrapper;
