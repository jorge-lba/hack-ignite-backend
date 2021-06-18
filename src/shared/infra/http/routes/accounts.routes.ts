import { Router } from "express";

import { CreateOperatorController } from "@modules/accounts/useCases/createOperator/CreateOperatorController";

const accountsRoutes = Router();

const createOperatorController = new CreateOperatorController();

accountsRoutes.post("/operators", createOperatorController.handle);

export { accountsRoutes };
