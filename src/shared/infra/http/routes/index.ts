import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { accountsRoutes } from "./accounts.routes";
import { messagesRoutes } from "./messages.routes";

const router = Router();

router.use("/accounts", ensureAuthenticated, accountsRoutes);
router.use("/messages", messagesRoutes);

export { router };
