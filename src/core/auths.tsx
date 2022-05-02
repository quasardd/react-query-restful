// import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosRequestConfig } from "axios";
// import { get } from "lodash";

export const getSimpleJwtAuth = (key: string, path: string) => {
  return {
    interceptorRequest: async (config: AxiosRequestConfig) => {
      /* const authCached = await AsyncStorage.getItem(key);

      if (authCached && config.headers) {
        const cachedParsed = JSON.parse(authCached);

        const token = get(cachedParsed, path);

        config.headers.Authorization = `Bearer ${token}`;
      }*/

      return config;
    },
  };
};
