import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { QueryClientConfig } from "react-query";

export interface IRestContext {
  axios: AxiosInstance;
  autoInvalidation?: boolean;
}

export interface IRestClientProviderProps {
  baseUrl: string;
  interceptors?: {
    onRequest?: (
      config: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onRequestError?: (error: AxiosError) => Promise<AxiosError> | AxiosError;
    onResponse?: (
      config: AxiosResponse
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
    onResponseError?: (error: AxiosError) => Promise<AxiosError> | AxiosError;
  };
  axiosConfig?: AxiosRequestConfig;
  clientConfig?: QueryClientConfig;
  autoInvalidation?: boolean;
}
