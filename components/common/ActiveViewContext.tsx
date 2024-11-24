import { ActiveView } from "@/types";
import { createContext } from "react";

//* Context
export const ActiveViewContext = createContext<ActiveView | null>(null);
