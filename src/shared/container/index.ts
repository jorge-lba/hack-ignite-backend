import { container } from "tsyringe";

import "@shared/container/providers";

import { CondominiumRepository } from "@modules/accounts/infra/typeorm/repositories/CondominiumRepository";
import { JointOwnersRepository } from "@modules/accounts/infra/typeorm/repositories/JointOwnerRepository";
import { OperatorsRepository } from "@modules/accounts/infra/typeorm/repositories/OperatorsRepository";
import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";

import { FirebaseAdmin } from "./firebase/FirebaseAdmin";

container.registerSingleton<IOperatorsRepository>(
  "OperatorsRepository",
  OperatorsRepository
);

container.registerSingleton<ICondominiumRepository>(
  "CondominiumRepository",
  CondominiumRepository
);
container.registerSingleton<IJointOwnerRepository>(
  "JointOwnersRepository",
  JointOwnersRepository
);
container.registerSingleton("FirebaseAdmin", FirebaseAdmin);
