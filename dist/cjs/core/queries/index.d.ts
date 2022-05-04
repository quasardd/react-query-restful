import { IQuery } from "./types";
export declare function buildQuery(config: Omit<IQuery, "params" | "id">): (data?: Partial<IQuery> | undefined) => import("react-query").UseQueryResult<unknown, unknown>;
