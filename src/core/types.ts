import { AxiosInstance, AxiosRequestConfig } from "axios";
import { QueryClientConfig } from "react-query";

export interface IBoilerplateQueryContext {
  axios: AxiosInstance;
}

export interface IBoilerplateQueryProviderProps {
  baseUrl: string;
  requestInterceptor?: (
    config: AxiosRequestConfig<any>
  ) => Promise<AxiosRequestConfig<any>>;
  axiosConfig?: AxiosRequestConfig<any>;
  clientConfig?: QueryClientConfig | undefined;
}
