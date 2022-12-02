import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryKey, useQuery, UseQueryResult } from "react-query";
import { buildUrl, useRestContext } from "..";
import { IQuery } from "./types";

const Query = <TQueryFnData, TError>({
  params,
  appendToUrl,
  path,
  options,
  cacheResponse,
  query,
  queryKey,
}: IQuery): UseQueryResult<TQueryFnData, TError> & { queryKey: QueryKey } => {
  const { axios } = useRestContext();

  const key = queryKey ?? [path, query, appendToUrl, params];

  return {
    queryKey: key,
    ...useQuery({
      queryKey: key,
      queryFn: async () => {
        const response = await axios.request({
          method: "GET",
          params,
          url: buildUrl({ path, query, append: appendToUrl }),
        });

        if (cacheResponse) {
          await AsyncStorage.setItem(
            cacheResponse.key,
            JSON.stringify(response.data)
          );
        }

        return response.data;
      },
      ...(options as any),
    }),
  };
};

export function buildQuery<TQueryFnData = any, TError = unknown>(
  config: Omit<IQuery, "params" | "id">
) {
  return (data?: Partial<IQuery>) =>
    Query<TQueryFnData, TError>({ ...config, ...data });
}
