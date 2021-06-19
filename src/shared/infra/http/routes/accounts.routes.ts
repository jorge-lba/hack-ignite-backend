import { Router } from "express";

import { CreateCondominiumController } from "@modules/accounts/useCases/createCondominium/CreateCondominiumController";
import { CreateOperatorController } from "@modules/accounts/useCases/createOperator/CreateOperatorController";
import { ListOperatorsController } from "@modules/accounts/useCases/listOperators/ListOperatorsController";
import { FinishRegisterOperatorController } from "@modules/accounts/useCases/finishRegisterOperator/FinishRegisterOperatorController";
import { DeleteOperatorController } from "@modules/accounts/useCases/deleteOperators/DeleteOperatorsController";
import { CreateJointOwnerController } from "@modules/accounts/useCases/createJointOwner/CreateJointOwnerController";
import { ListJointOwnersController } from "@modules/accounts/useCases/listJointOwners/ListJointOwnerController";
import { ListJointOwnersByIdController } from "@modules/accounts/useCases/listJointOwnersById/ListJointOwnersByIdController";

const accountsRoutes = Router();

const createCondominiumController = new CreateCondominiumController();
const createOperatorController = new CreateOperatorController();
const finishRegisterOperatorController = new FinishRegisterOperatorController();
const listOperatorsController = new ListOperatorsController();
const deleteOperatorController = new DeleteOperatorController();
const createJointOwnerController = new CreateJointOwnerController();
const listJointOwnersController = new ListJointOwnersController();
const listJointOwnersByIdController = new ListJointOwnersByIdController();
accountsRoutes.post("/condominiums", createCondominiumController.handle);

accountsRoutes.post("/operators", createOperatorController.handle);
accountsRoutes.get("/operators", listOperatorsController.handle);
accountsRoutes.patch("/operators", finishRegisterOperatorController.handle);
accountsRoutes.delete("/operators/:id", deleteOperatorController.handle);

accountsRoutes.post("/jointOwners", createJointOwnerController.handle);
accountsRoutes.get("/jointOwners", listJointOwnersController.handle);
accountsRoutes.get("/jointOwners/:id", listJointOwnersByIdController.handle);

export { accountsRoutes };
