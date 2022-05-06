import { UseMutationOptions, UseMutationResult } from "react-query";
import type { PascalCase } from "type-fest";

export type IOperationsMutations = "CREATE" | "UPDATE" | "REPLACE" | "DELETE";

export interface IMutationData {
  data?: { [key: string]: any };
  appendToUrl?: string | number;
}

export interface IMutation {
  path: string | string[];
  operation: IOperationsMutations;
  invalidatePaths?: string[];
  cacheResponse?: {
    key: string;
  };
  options?: Omit<
    UseMutationOptions<any, unknown, IMutationData | void>,
    "mutationFn"
  >;
}

export type IMutationConfig = Omit<IMutation, "operation">;

export interface IBuildMutation<T>
  extends Omit<IMutation, "path" | "operation"> {
  path: T[] | T;
}

type ISingular<T extends string> = T extends `${infer Front}s`
  ? PascalCase<Front>
  : PascalCase<T>;

type IMutationFn = (
  overrideConfig?: Partial<IMutationConfig>
) => UseMutationResult<any, unknown, IMutationData | void>;

export type IBuildMutationReturnType<Path extends string> = {
  [K in IOperationsMutations as `${Lowercase<IOperationsMutations>}${ISingular<Path>}Mutation`]: IMutationFn;
};
