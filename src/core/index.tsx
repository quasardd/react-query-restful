import React, {
  PropsWithChildren,
  createContext,
  useMemo,
  useContext,
} from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Axios from "axios";
import { IRestContext, IRestClientProviderProps, IBuildUrl } from "./types";

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

export function buildUrl({ path, append, query }: IBuildUrl) {
  let paths = Array.isArray(path) ? path.join("/") : path;

  if (query) {
    // Replace the wildcards present in the path with the query values, ex: /users/[id] -> /users/1
    paths = paths.replace(/\[([^\]]+)]/g, (match, key) => query[key] || match);
  }

  // Remove leading slash if present
  if (paths.charAt(0) === "/") {
    paths = paths.slice(1);
  }

  if (append) {
    paths = `${paths}${append}`;
  }

  // Remove any double slashs from paths
  paths = paths.replace(/\/\//g, "/");

  return paths;
}

// A wildcard contains a [id] or [slug] or [whatever]
export function isStringAWildcard(str: string) {
  return str.startsWith("[") && str.endsWith("]");
}
