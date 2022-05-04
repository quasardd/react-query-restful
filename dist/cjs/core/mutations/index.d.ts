import { IBuildMutationReturnType, IBuildMutation } from "./types";
export declare function buildMutation<T extends string>(config: IBuildMutation<T>): IBuildMutationReturnType<T>;
