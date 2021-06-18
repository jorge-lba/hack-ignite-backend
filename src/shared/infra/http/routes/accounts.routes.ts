import { Router } from "express";

import { CreateCondominiumController } from "@modules/accounts/useCases/createCondominium/CreateCondominiumController";
import { CreateOperatorController } from "@modules/accounts/useCases/createOperator/CreateOperatorController";

const accountsRoutes = Router();

const createOperatorController = new CreateOperatorController();

const createCondominiumController = new CreateCondominiumController();

accountsRoutes.post("/condominiums", createCondominiumController.handle);

accountsRoutes.post("/operators", createOperatorController.handle);

export { accountsRoutes };
