import { UseQueryOptions } from "react-query";
export interface IQuery {
    path: string;
    params?: {
        [key: string]: any;
    };
    appendToUrl?: string | number;
    options?: Omit<UseQueryOptions<unknown, unknown, unknown, any>, "queryKey"> | undefined;
    cacheResponse?: {
        key: string;
    };
}
