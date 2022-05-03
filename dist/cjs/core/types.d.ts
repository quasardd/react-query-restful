import { AxiosInstance, AxiosRequestConfig } from "axios";
import { QueryClientConfig } from "react-query";
export interface IRestContext {
    axios: AxiosInstance;
    autoInvalidation?: boolean;
}
export interface IRestClientProviderProps {
    baseUrl: string;
    requestInterceptor?: (config: AxiosRequestConfig<any>) => Promise<AxiosRequestConfig<any>>;
    axiosConfig?: AxiosRequestConfig<any>;
    clientConfig?: QueryClientConfig | undefined;
    autoInvalidation?: boolean;
}
