import React, { PropsWithChildren } from "react";
import { IRestContext, IRestClientProviderProps, IBuildUrl } from "./types";
export declare const RestClientProvider: React.FC<PropsWithChildren<IRestClientProviderProps>>;
export declare const useRestContext: () => IRestContext;
export declare function buildUrl({ path, append, query }: IBuildUrl): string;
