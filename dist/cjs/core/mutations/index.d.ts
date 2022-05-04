import { IBuildMutation, IMutationData } from "./types";
export declare function buildMutation(config: IBuildMutation): {
    createMutation: (overrideConfig?: Partial<IBuildMutation> | undefined) => import("react-query").UseMutationResult<any, unknown, IMutationData | undefined, unknown>;
    updateMutation: (overrideConfig?: Partial<IBuildMutation> | undefined) => import("react-query").UseMutationResult<any, unknown, IMutationData | undefined, unknown>;
    replaceMutation: (overrideConfig?: Partial<IBuildMutation> | undefined) => import("react-query").UseMutationResult<any, unknown, IMutationData | undefined, unknown>;
    deleteMutation: (overrideConfig?: Partial<IBuildMutation> | undefined) => import("react-query").UseMutationResult<any, unknown, IMutationData | undefined, unknown>;
};
