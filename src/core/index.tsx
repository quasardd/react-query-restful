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

const queryClient = new QueryClient();

export const BoilerplateQueryProvider: React.FC<
  PropsWithChildren<IBoilerplateQueryProviderProps>
> = ({ children, baseUrl, requestInterceptor }) => {
  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL: baseUrl,
      timeout: 30 * 1000,
    });

    if (requestInterceptor) {
      axios.interceptors.request.use(requestInterceptor);
    }

    return axios;
  }, [baseUrl, requestInterceptor]);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={{ axios }}>
        {children}
      </QueryContext.Provider>
    </QueryClientProvider>
  );
};

export const useQueryContext = () => {
  return useContext(QueryContext);
};

export function buildUrl(path: string, append?: string | number) {
  if (append) {
    return `${path}/${append}`;
  }

  return path;
}
