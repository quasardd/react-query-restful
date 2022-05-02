/// <reference types="lodash" />
import { IBuildMutation, IMutationData } from "./types";
export declare const createMutation: import("lodash").CurriedFunction1<IBuildMutation, (overrideConfig?: Partial<IBuildMutation> | undefined) => import("react-query").UseMutationResult<any, unknown, IMutationData | undefined, unknown>>;
export declare const updateMutation: import("lodash").CurriedFunction1<IBuildMutation, (overrideConfig?: Partial<IBuildMutation> | undefined) => import("react-query").UseMutationResult<any, unknown, IMutationData | undefined, unknown>>;
export declare const replaceMutation: import("lodash").CurriedFunction1<IBuildMutation, (overrideConfig?: Partial<IBuildMutation> | undefined) => import("react-query").UseMutationResult<any, unknown, IMutationData | undefined, unknown>>;
export declare const deleteMutation: import("lodash").CurriedFunction1<IBuildMutation, (overrideConfig?: Partial<IBuildMutation> | undefined) => import("react-query").UseMutationResult<any, unknown, IMutationData | undefined, unknown>>;
