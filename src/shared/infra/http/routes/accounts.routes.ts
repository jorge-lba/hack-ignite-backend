import { Router } from "express";

import { CreateCondominiumController } from "@modules/accounts/useCases/createCondominium/CreateCondominiumController";
import { CreateOperatorController } from "@modules/accounts/useCases/createOperator/CreateOperatorController";
import { FinishRegisterOperatorController } from "@modules/accounts/useCases/finishRegisterOperator/FinishRegisterOperatorController";

const accountsRoutes = Router();

const createOperatorController = new CreateOperatorController();

const createCondominiumController = new CreateCondominiumController();

const finishRegisterOperatorController = new FinishRegisterOperatorController();

accountsRoutes.post("/condominiums", createCondominiumController.handle);

accountsRoutes.post("/operators", createOperatorController.handle);
accountsRoutes.patch("/operators", finishRegisterOperatorController.handle);

export { accountsRoutes };
