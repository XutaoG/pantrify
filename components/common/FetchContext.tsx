import { createContext } from "react";

interface RefreshContextProps {
	refreshValue: boolean;
	refresh: () => void;
}

//* Context
export const RefreshContext = createContext<RefreshContextProps | null>(null);
