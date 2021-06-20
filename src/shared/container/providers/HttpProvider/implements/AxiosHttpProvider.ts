import axios, { AxiosRequestConfig } from "axios";

import { IHttpProvider } from "../IHttpProvider";

class AxiosHttpProvider implements IHttpProvider {
  async requestGetByUrl(url: string): Promise<any> {
    const { data } = await axios.get(url);

    return data;
  }

  async requestPostByUrl(
    url: string,
    body: any,
    config: AxiosRequestConfig
  ): Promise<any> {
    const { data } = await axios.post(url, body, config);

    return data;
  }
}

export { AxiosHttpProvider };
