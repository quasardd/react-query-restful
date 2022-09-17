import AsyncStorage from "@react-native-async-storage/async-storage";
import { camelCase, curry } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import { buildUrl, useRestContext } from "..";
import {
  IMutationConfig,
  IBuildMutation,
  IMutation,
  IMutationData,
  IOperationsMutations,
  MutationFnOverrides,
} from "./types";

const Mutation = ({
  operation,
  path,
  invalidatePaths,
  options,
  cacheResponse,
  overrides,
}: IMutation) => {
  const { axios, autoInvalidation } = useRestContext();
  const queryClient = useQueryClient();

  const { onSuccess, ...restOptions } = options || {};

  return useMutation(
    async (variables?: IMutationData) => {
      const method = getMethodFromOperation(operation);

      const requestFn =
        overrides?.mutationFnOverrides?.[
          getOverrideFnByOperationName(operation)
        ];

      const response = requestFn
        ? await requestFn(axios, variables)
        : await axios.request({
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
          queryClient.invalidateQueries(buildUrl(path));
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

export function buildMutation(config: IBuildMutation) {
  const buildWithConfig = curry(build)(config);

  return {
    createMutation: buildWithConfig("CREATE"),
    updateMutation: buildWithConfig("UPDATE"),
    replaceMutation: buildWithConfig("REPLACE"),
    deleteMutation: buildWithConfig("DELETE"),
  };
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

function getOverrideFnByOperationName(
  operation: IOperationsMutations
): keyof MutationFnOverrides {
  return camelCase(operation) as keyof MutationFnOverrides;
}
