import { AxiosInstance, AxiosRequestConfig } from "axios";
export interface IBoilerplateQueryContext {
    axios: AxiosInstance;
}
export interface IBoilerplateQueryProviderProps {
    baseUrl: string;
    requestInterceptor?: (config: AxiosRequestConfig<any>) => Promise<AxiosRequestConfig<any>>;
}
