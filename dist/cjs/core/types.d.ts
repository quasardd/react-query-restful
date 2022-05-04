import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { QueryClientConfig } from "react-query";
export interface IRestContext {
    axios: AxiosInstance;
    autoInvalidation?: boolean;
}
export interface IRestClientProviderProps {
    baseUrl: string;
    interceptors?: {
        onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
        onRequestError?: (error: AxiosError) => Promise<AxiosError>;
        onResponse?: (config: AxiosResponse) => AxiosResponse;
        onResponseError?: (error: AxiosError) => Promise<AxiosError>;
    };
    axiosConfig?: AxiosRequestConfig;
    clientConfig?: QueryClientConfig;
    autoInvalidation?: boolean;
}
