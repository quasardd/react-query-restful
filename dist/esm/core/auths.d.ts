import { AxiosRequestConfig } from "axios";
export declare const getSimpleJwtAuth: (key: string, path: string) => {
    interceptorRequest: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig<any>>;
};