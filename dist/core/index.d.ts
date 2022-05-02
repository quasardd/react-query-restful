import { PropsWithChildren } from "react";
import { IBoilerplateQueryContext, IBoilerplateQueryProviderProps } from "./types";
export declare const BoilerplateQueryProvider: React.FC<PropsWithChildren<IBoilerplateQueryProviderProps>>;
export declare const useQueryContext: () => IBoilerplateQueryContext;
export declare function buildUrl(path: string, append?: string | number): string;
