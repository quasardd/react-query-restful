import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useContext,
} from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Axios from "axios";
import { IRestContext, IRestClientProviderProps } from "./types";

const RestContext = createContext({} as IRestContext);

export const RestClientProvider: React.FC<
  PropsWithChildren<IRestClientProviderProps>
> = ({
  children,
  baseUrl,
  clientConfig,
  axiosConfig,
  autoInvalidation = true,
  interceptors,
}) => {
  const queryClient = useMemo(
    () => new QueryClient(clientConfig),
    [clientConfig]
  );

  const axios = useMemo(() => {
    const instance = Axios.create({
      baseURL: baseUrl,
      timeout: 30 * 1000,
      ...axiosConfig,
    });

    if (interceptors) {
      instance.interceptors.request.use(
        interceptors.onRequest,
        interceptors.onRequestError
      );

      instance.interceptors.response.use(
        interceptors.onResponse,
        interceptors.onResponseError
      );
    }

    return instance;
  }, [baseUrl, axiosConfig, interceptors]);

  const contextValues = useMemo(
    () => ({
      axios,
      autoInvalidation,
    }),
    [axios, autoInvalidation]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RestContext.Provider value={contextValues}>
        {children}
      </RestContext.Provider>
    </QueryClientProvider>
  );
};

export const useRestContext = () => useContext(RestContext);

export function buildUrl(path: string[] | string, append?: string | number) {
  const paths = Array.isArray(path) ? path.join("/") : path;

  if (append) {
    return `${paths}/${append}`;
  }

  return paths;
}
