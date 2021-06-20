import { AxiosRequestConfig } from "axios";

interface IHttpProvider {
  requestGetByUrl<T>(url: string): Promise<T>;
  requestPostByUrl<T>(
    url: string,
    body: any,
    config: AxiosRequestConfig
  ): Promise<T>;
}

export { IHttpProvider };
