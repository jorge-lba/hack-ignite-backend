import { container } from "tsyringe";

import "@shared/container/providers";

import { CondominiumRepository } from "@modules/accounts/infra/typeorm/repositories/CondominiumRepository";
import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";

container.registerSingleton<ICondominiumRepository>(
  "CondominiumRepository",
  CondominiumRepository
);
