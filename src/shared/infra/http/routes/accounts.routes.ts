import { Router } from "express";

import { CreateCondominiumController } from "@modules/accounts/useCases/createCondominium/CreateCondominiumController";
import { CreateOperatorController } from "@modules/accounts/useCases/createOperator/CreateOperatorController";
import { FinishRegisterOperatorController } from "@modules/accounts/useCases/finishRegisterOperator/FinishRegisterOperatorController";
import { ListOperatorsController } from "@modules/accounts/useCases/listOperators/ListOperatorsController";

const accountsRoutes = Router();

const createOperatorController = new CreateOperatorController();
const listOperatorsController = new ListOperatorsController();

const createCondominiumController = new CreateCondominiumController();

const finishRegisterOperatorController = new FinishRegisterOperatorController();

accountsRoutes.post("/condominiums", createCondominiumController.handle);

accountsRoutes.post("/operators", createOperatorController.handle);
accountsRoutes.get("/operators", listOperatorsController.handle);
accountsRoutes.patch("/operators", finishRegisterOperatorController.handle);

export { accountsRoutes };
