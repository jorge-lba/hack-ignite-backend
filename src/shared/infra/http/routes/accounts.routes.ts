import { Router } from "express";

import { CreateCondominiumController } from "@modules/accounts/useCases/createCondominium/CreateCondominiumController";
import { CreateOperatorController } from "@modules/accounts/useCases/createOperator/CreateOperatorController";
import { ListOperatorsController } from "@modules/accounts/useCases/listOperators/ListOperatorsController";
import { FinishRegisterOperatorController } from "@modules/accounts/useCases/finishRegisterOperator/FinishRegisterOperatorController";
import { DeleteOperatorController } from "@modules/accounts/useCases/deleteOperators/DeleteOperatorsController";
import { CreateJointOwnerController } from "@modules/accounts/useCases/createJointOwner/CreateJointOwnerController";

const accountsRoutes = Router();

const createCondominiumController = new CreateCondominiumController();
const createOperatorController = new CreateOperatorController();
const finishRegisterOperatorController = new FinishRegisterOperatorController();
const listOperatorsController = new ListOperatorsController();
const deleteOperatorController = new DeleteOperatorController();
const createJointOwnerController = new CreateJointOwnerController();

accountsRoutes.post("/condominiums", createCondominiumController.handle);

accountsRoutes.post("/operators", createOperatorController.handle);
accountsRoutes.get("/operators", listOperatorsController.handle);
accountsRoutes.patch("/operators", finishRegisterOperatorController.handle);
accountsRoutes.delete("/operators/:id", deleteOperatorController.handle);

accountsRoutes.post("/jointOwners", createJointOwnerController.handle);
export { accountsRoutes };
