"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUrl = exports.useQueryContext = exports.BoilerplateQueryProvider = void 0;
const react_1 = require("react");
const react_query_1 = require("react-query");
const axios_1 = require("axios");
const QueryContext = (0, react_1.createContext)({});
const queryClient = new react_query_1.QueryClient();
const BoilerplateQueryProvider = ({ children, baseUrl, requestInterceptor }) => {
    const axios = (0, react_1.useMemo)(() => {
        const axios = axios_1.default.create({
            baseURL: baseUrl,
            timeout: 30 * 1000,
        });
        if (requestInterceptor) {
            axios.interceptors.request.use(requestInterceptor);
        }
        return axios;
    }, [baseUrl, requestInterceptor]);
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={{ axios }}>
        {children}
      </QueryContext.Provider>
    </react_query_1.QueryClientProvider>);
};
exports.BoilerplateQueryProvider = BoilerplateQueryProvider;
const useQueryContext = () => {
    return (0, react_1.useContext)(QueryContext);
};
exports.useQueryContext = useQueryContext;
function buildUrl(path, append) {
    if (append) {
        return `${path}/${append}`;
    }
    return path;
}
exports.buildUrl = buildUrl;
