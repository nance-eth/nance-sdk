import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from "react";
export const NanceContext = createContext({ apiUrl: "https://api.nance.app" });
export function NanceProvider({ apiUrl, children }) {
    return (_jsx(NanceContext.Provider, { value: { apiUrl }, children: children }));
}
;
