import React, { PropsWithChildren } from "react";
export interface NanceContextData {
    apiUrl: string;
}
export declare const NanceContext: React.Context<NanceContextData>;
export declare function NanceProvider({ apiUrl, children }: PropsWithChildren<NanceContextData>): import("react/jsx-runtime").JSX.Element;
