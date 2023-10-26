import { createContext } from "react";

export interface NanceContextData {
  apiUrl: string;
}

export const NanceContext = createContext<NanceContextData>({ apiUrl: "https://api.nance.app" });
