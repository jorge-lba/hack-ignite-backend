import { container } from "tsyringe";

import "@shared/container/providers";

import { CondominiumRepository } from "@modules/accounts/infra/typeorm/repositories/CondominiumRepository";
import { OperatorsRepository } from "@modules/accounts/infra/typeorm/repositories/OperatorsRepository";
import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";

container.registerSingleton<IOperatorsRepository>(
  "OperatorsRepository",
  OperatorsRepository
);

container.registerSingleton<ICondominiumRepository>(
  "CondominiumRepository",
  CondominiumRepository
);
