import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useContext,
} from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Axios from "axios";
import {
  IBoilerplateQueryContext,
  IBoilerplateQueryProviderProps,
} from "./types";

const QueryContext = createContext({} as IBoilerplateQueryContext);

export const BoilerplateQueryProvider: React.FC<
  PropsWithChildren<IBoilerplateQueryProviderProps>
> = ({ children, baseUrl, requestInterceptor, clientConfig, axiosConfig }) => {
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

    if (requestInterceptor) {
      instance.interceptors.request.use(requestInterceptor);
    }

    return instance;
  }, [baseUrl, requestInterceptor, axiosConfig]);

  const contextValues = useMemo(
    () => ({
      axios,
    }),
    [axios]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={contextValues}>
        {children}
      </QueryContext.Provider>
    </QueryClientProvider>
  );
};

export const useQueryContext = () => useContext(QueryContext);

export function buildUrl(path: string, append?: string | number) {
  if (append) {
    return `${path}/${append}`;
  }

  return path;
}
