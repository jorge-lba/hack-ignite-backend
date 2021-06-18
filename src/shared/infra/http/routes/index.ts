import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { accountsRoutes } from "./accounts.routes";

const router = Router();

router.use("/accounts", ensureAuthenticated, accountsRoutes);

export { router };
