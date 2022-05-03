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
      <RestContext.Provider value={contextValues}>
        {children}
      </RestContext.Provider>
    </QueryClientProvider>
  );
};

export const useRestContext = () => useContext(RestContext);

export function buildUrl(path: string, append?: string | number) {
  if (append) {
    return `${path}/${append}`;
  }

  return path;
}
