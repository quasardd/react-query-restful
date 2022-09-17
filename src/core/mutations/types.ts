/* eslint-disable no-use-before-define */
import { AxiosInstance } from "axios";
import { UseMutationOptions } from "react-query";

export type IOperationsMutations = "CREATE" | "UPDATE" | "REPLACE" | "DELETE";

export type MutationFnOverrides = {
  create?: (api: AxiosInstance, variables?: IMutationData) => Promise<any>;
  update?: (api: AxiosInstance, variables?: IMutationData) => Promise<any>;
  replace?: (api: AxiosInstance, variables?: IMutationData) => Promise<any>;
  delete?: (api: AxiosInstance, variables?: IMutationData) => Promise<any>;
};

export type Overrides = {
  mutationFnOverrides?: MutationFnOverrides;
};

export type IMutationData =
  | (Pick<IMutation, "appendToUrl" | "query"> & {
      data?: { [key: string]: any };
    })
  | void;

export interface IMutation {
  path: string | string[];
  operation: IOperationsMutations;
  invalidatePaths?: string[];
  cacheResponse?: {
    key: string;
  };
  options?: Omit<UseMutationOptions<any, unknown, IMutationData>, "mutationFn">;
  overrides?: Overrides;
  query?: {
    [key: string]: any;
  };
  appendToUrl?: string | number;
}

export interface IBuildMutation extends Omit<IMutation, "operation"> {}
