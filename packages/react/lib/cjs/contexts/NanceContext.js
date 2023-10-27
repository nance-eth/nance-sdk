"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanceProvider = exports.NanceContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.NanceContext = (0, react_1.createContext)({ apiUrl: "https://api.nance.app" });
function NanceProvider({ apiUrl, children }) {
    return ((0, jsx_runtime_1.jsx)(exports.NanceContext.Provider, { value: { apiUrl }, children: children }));
}
exports.NanceProvider = NanceProvider;
;
