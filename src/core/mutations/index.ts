import AsyncStorage from "@react-native-async-storage/async-storage";
import { curry } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import { buildUrl, useRestContext } from "..";
import {
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
        await AsyncStorage.setItem(cacheResponse.key, response.data);
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

function build(config: IBuildMutation, operation: IOperationsMutations) {
  return (overrideConfig?: Partial<IBuildMutation>) =>
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
