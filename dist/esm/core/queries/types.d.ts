import { QueryKey, UseQueryOptions } from "react-query";
export interface IQuery {
    path: string | string[];
    params?: {
        [key: string]: any;
    };
    appendToUrl?: string | number;
    options?: Omit<UseQueryOptions, "queryKey">;
    cacheResponse?: {
        key: string;
    };
    query?: {
        [key: string]: any;
    };
    queryKey?: QueryKey;
}
