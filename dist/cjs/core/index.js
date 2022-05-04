"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUrl = exports.useRestContext = exports.RestClientProvider = void 0;
const react_1 = __importStar(require("react"));
const react_query_1 = require("react-query");
const axios_1 = __importDefault(require("axios"));
const RestContext = (0, react_1.createContext)({});
const RestClientProvider = ({ children, baseUrl, clientConfig, axiosConfig, autoInvalidation = true, interceptors, }) => {
    const queryClient = (0, react_1.useMemo)(() => new react_query_1.QueryClient(clientConfig), [clientConfig]);
    const axios = (0, react_1.useMemo)(() => {
        const instance = axios_1.default.create(Object.assign({ baseURL: baseUrl, timeout: 30 * 1000 }, axiosConfig));
        if (interceptors) {
            instance.interceptors.request.use(interceptors.onRequest, interceptors.onRequestError);
            instance.interceptors.response.use(interceptors.onResponse, interceptors.onResponseError);
        }
        return instance;
    }, [baseUrl, axiosConfig, interceptors]);
    const contextValues = (0, react_1.useMemo)(() => ({
        axios,
        autoInvalidation,
    }), [axios, autoInvalidation]);
    return (react_1.default.createElement(react_query_1.QueryClientProvider, { client: queryClient },
        react_1.default.createElement(RestContext.Provider, { value: contextValues }, children)));
};
exports.RestClientProvider = RestClientProvider;
const useRestContext = () => (0, react_1.useContext)(RestContext);
exports.useRestContext = useRestContext;
function buildUrl(path, append) {
    const paths = Array.isArray(path) ? path.join("/") : path;
    if (append) {
        return `${paths}/${append}`;
    }
    return paths;
}
exports.buildUrl = buildUrl;
//# sourceMappingURL=index.js.map