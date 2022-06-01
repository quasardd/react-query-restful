import React, { createContext, useMemo, useContext, } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Axios from "axios";
const RestContext = createContext({});
export const RestClientProvider = ({ children, baseUrl, clientConfig, axiosConfig, autoInvalidation = true, interceptors, }) => {
    const queryClient = useMemo(() => new QueryClient(clientConfig), [clientConfig]);
    const axios = useMemo(() => {
        const instance = Axios.create(Object.assign({ baseURL: baseUrl, timeout: 30 * 1000 }, axiosConfig));
        if (interceptors) {
            instance.interceptors.request.use(interceptors.onRequest, interceptors.onRequestError);
            instance.interceptors.response.use(interceptors.onResponse, interceptors.onResponseError);
        }
        return instance;
    }, [baseUrl, axiosConfig, interceptors]);
    const contextValues = useMemo(() => ({
        axios,
        autoInvalidation,
    }), [axios, autoInvalidation]);
    return (React.createElement(QueryClientProvider, { client: queryClient },
        React.createElement(RestContext.Provider, { value: contextValues }, children)));
};
export const useRestContext = () => useContext(RestContext);
export function buildUrl(path, append) {
    let paths = Array.isArray(path) ? path.join("/") : path;
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
//# sourceMappingURL=index.js.map