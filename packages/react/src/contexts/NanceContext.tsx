import React, { PropsWithChildren, createContext } from "react";

export interface NanceContextData {
  apiUrl: string;
}

export const NanceContext = createContext<NanceContextData>({ apiUrl: "https://api.nance.app" });

export function NanceProvider({ apiUrl, children }: PropsWithChildren<NanceContextData>) {
  return (
    <NanceContext.Provider value={{ apiUrl }}>
      {children}
    </NanceContext.Provider>
  );
};
