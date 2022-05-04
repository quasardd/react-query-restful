import { UseMutationOptions, UseMutationResult } from "react-query";
import type { PascalCase } from "type-fest";
export declare type IOperationsMutations = "CREATE" | "UPDATE" | "REPLACE" | "DELETE";
export interface IMutationData {
    data?: {
        [key: string]: any;
    };
    appendToUrl?: string | number;
}
export interface IMutation {
    path: string | string[];
    operation: IOperationsMutations;
    invalidatePaths?: string[];
    cacheResponse?: {
        key: string;
    };
    options?: Omit<UseMutationOptions<any, unknown, IMutationData | undefined, unknown>, "mutationFn"> | undefined;
}
export declare type IMutationConfig = Omit<IMutation, "operation">;
export interface IBuildMutation<T> extends Omit<IMutation, "path" | "operation"> {
    path: T[] | T;
}
declare type ISingular<T extends string> = T extends `${infer Front}s` ? Capitalize<Front> : Capitalize<T>;
declare type IMutationFn = (overrideConfig?: Partial<IMutationConfig>) => UseMutationResult<any, unknown, IMutationData | undefined, unknown>;
export declare type IBuildMutationReturnType<Path extends string> = {
    [K in IOperationsMutations as `${Lowercase<IOperationsMutations>}${PascalCase<ISingular<Path>>}Mutation`]: IMutationFn;
};
export {};
