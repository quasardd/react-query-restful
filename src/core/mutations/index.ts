import AsyncStorage from "@react-native-async-storage/async-storage";
import { camelCase, curry } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import { buildUrl, useRestContext } from "..";
import {
  IBuildMutationReturnType,
  IMutationConfig,
  IBuildMutation,
  IMutation,
  IMutationData,
  IOperationsMutations,
} from "./types";

const Mutation = ({
  operation,
  path,
  invalidatePaths,
  options,
  cacheResponse,
}: IMutation) => {
  const { axios, autoInvalidation } = useRestContext();
  const queryClient = useQueryClient();

  const { onSuccess, ...restOptions } = options || {};

  return useMutation(
    async (variables?: IMutationData) => {
      const method = getMethodFromOperation(operation);

      const response = await axios.request({
        method,
        data: variables?.data,
        url: buildUrl(path, variables?.appendToUrl),
      });

      if (cacheResponse) {
        await AsyncStorage.setItem(
          cacheResponse.key,
          JSON.stringify(response.data)
        );
      }

      return response.data;
    },
    {
      onSuccess: (data, variables, context) => {
        if (autoInvalidation) {
          queryClient.invalidateQueries(path);
        }

        if (invalidatePaths) {
          invalidatePaths.forEach((v) => {
            queryClient.invalidateQueries(v);
          });
        }

        if (onSuccess) {
          onSuccess(data, variables, context);
        }
      },
      ...restOptions,
    }
  );
};

function build(config: IMutationConfig, operation: IOperationsMutations) {
  return (overrideConfig?: Partial<IMutationConfig>) =>
    Mutation({ ...config, operation, ...overrideConfig });
}

export function buildMutation<T extends string>(
  config: IBuildMutation<T>
): IBuildMutationReturnType<T> {
  const buildWithConfig = curry(build)(config);

  const formattedPaths = [] as string[];

  if (Array.isArray(config.path)) {
    config.path.forEach((path) => {
      const singularPath = path.replace(/s$/, "");

      formattedPaths.push(singularPath);
    });
  } else {
    const { path } = config;

    const singularPath = path.replace(/s$/, "");

    formattedPaths.push(singularPath);
  }

  const methods = formattedPaths.map((path) => ({
    [camelCase(`create ${path} Mutation`)]: buildWithConfig("CREATE"),
    [camelCase(`update ${path} Mutation`)]: buildWithConfig("UPDATE"),
    [camelCase(`replace ${path} Mutation`)]: buildWithConfig("REPLACE"),
    [camelCase(`delete ${path} Mutation`)]: buildWithConfig("DELETE"),
  }));

  return methods;
}

function getMethodFromOperation(operation: IOperationsMutations) {
  switch (operation) {
    case "UPDATE":
      return "PATCH";
    case "REPLACE":
      return "PUT";
    case "DELETE":
      return "DELETE";
    case "CREATE":
    default:
      return "POST";
  }
}
