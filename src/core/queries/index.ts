// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import { buildUrl, useQueryContext } from "..";
import { IQuery } from "./types";

const Query = ({
  params,
  appendToUrl,
  path,
  options,
  cacheResponse,
}: IQuery) => {
  const { axios } = useQueryContext();

  return useQuery({
    queryKey: [path, appendToUrl, params],
    queryFn: async () => {
      const response = await axios.request({
        method: "GET",
        params,
        url: buildUrl(path, appendToUrl),
      });

      if (cacheResponse) {
        // await AsyncStorage.setItem(cacheResponse.key, response.data);
      }

      return response.data;
    },
    ...options,
  });
};

export function buildQuery(config: Omit<IQuery, "params" | "id">) {
  return function (data?: Partial<IQuery>) {
    return Query({ ...config, ...data });
  };
}
