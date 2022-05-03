import React, { createContext, useMemo, useContext, } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Axios from "axios";
const RestContext = createContext({});
export const RestClientProvider = ({ children, baseUrl, requestInterceptor, clientConfig, axiosConfig }) => {
    const queryClient = useMemo(() => new QueryClient(clientConfig), [clientConfig]);
    const axios = useMemo(() => {
        const instance = Axios.create(Object.assign({ baseURL: baseUrl, timeout: 30 * 1000 }, axiosConfig));
        if (requestInterceptor) {
            instance.interceptors.request.use(requestInterceptor);
        }
        return instance;
    }, [baseUrl, requestInterceptor, axiosConfig]);
    const contextValues = useMemo(() => ({
        axios,
    }), [axios]);
    return (React.createElement(QueryClientProvider, { client: queryClient },
        React.createElement(RestContext.Provider, { value: contextValues }, children)));
};
export const useRestContext = () => useContext(RestContext);
export function buildUrl(path, append) {
    if (append) {
        return `${path}/${append}`;
    }
    return path;
}
//# sourceMappingURL=index.js.map