import { createContext } from "react";

//* Context
export const FetchContext = createContext<(() => Promise<void>) | null>(null);
