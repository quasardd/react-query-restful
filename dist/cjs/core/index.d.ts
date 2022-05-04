import React, { PropsWithChildren } from "react";
import { IRestContext, IRestClientProviderProps } from "./types";
export declare const RestClientProvider: React.FC<PropsWithChildren<IRestClientProviderProps>>;
export declare const useRestContext: () => IRestContext;
export declare function buildUrl(path: string[] | string, append?: string | number): string;
