import { QueryKey, UseQueryResult } from "react-query";
import { IQuery } from "./types";
export declare function buildQuery<TQueryFnData = any, TError = unknown>(config: Omit<IQuery, "params" | "id">): (data?: Partial<IQuery> | undefined) => UseQueryResult<TQueryFnData, TError> & {
    queryKey: QueryKey;
};
