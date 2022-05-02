import { createContext, useMemo, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Axios from "axios";
const QueryContext = createContext({});
const queryClient = new QueryClient();
export const BoilerplateQueryProvider = ({ children, baseUrl, requestInterceptor }) => {
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
    return (React.createElement(QueryClientProvider, { client: queryClient },
        React.createElement(QueryContext.Provider, { value: { axios } }, children)));
};
export const useQueryContext = () => {
    return useContext(QueryContext);
};
export function buildUrl(path, append) {
    if (append) {
        return `${path}/${append}`;
    }
    return path;
}
