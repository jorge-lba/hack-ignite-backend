import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";

const router = Router();

router.use("/accounts", accountsRoutes);

export { router };
