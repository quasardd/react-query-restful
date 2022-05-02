import AsyncStorage from "@react-native-async-storage/async-storage";
import { curry } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import { buildUrl, useQueryContext } from "..";
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
  const { axios } = useQueryContext();
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
        queryClient.invalidateQueries(path);
        queryClient.invalidateQueries(path);

        if (invalidatePaths) {
          invalidatePaths.forEach((v) => {
            queryClient.invalidateQueries(v);
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

function buildMutation(
  operation: IOperationsMutations,
  config: IBuildMutation
) {
  return function (overrideConfig?: Partial<IBuildMutation>) {
    return Mutation({ ...config, operation, ...overrideConfig });
  };
}

export const createMutation = curry(buildMutation)("CREATE");
export const updateMutation = curry(buildMutation)("UPDATE");
export const replaceMutation = curry(buildMutation)("REPLACE");
export const deleteMutation = curry(buildMutation)("DELETE");

function getMethodFromOperation(operation: IOperationsMutations) {
  switch (operation) {
    case "CREATE":
      return "POST";
    case "UPDATE":
      return "PATCH";
    case "REPLACE":
      return "PUT";
    case "DELETE":
      return "DELETE";
  }
}
