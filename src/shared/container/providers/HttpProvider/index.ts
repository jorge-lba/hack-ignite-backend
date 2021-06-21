import { container } from "tsyringe";

import { IHttpProvider } from "./IHttpProvider";
import { AxiosHttpProvider } from "./implements/AxiosHttpProvider";

container.registerSingleton<IHttpProvider>(
  "AxiosHttpProvider",
  AxiosHttpProvider
);
