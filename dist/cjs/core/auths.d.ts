import { AxiosRequestConfig } from "axios";
export declare const getSimpleJwtAuth: ({ key, path, }: {
    key: string;
    path: string;
}) => {
    interceptors: {
        onRequest: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig<any>>;
    };
};
