import { Router } from "express";

import { ReceiverMessageController } from "@modules/messages/useCases/receiverMessage/ReceiverMessageController";

const messagesRoutes = Router();

const receiverMessageController = new ReceiverMessageController();

messagesRoutes.post("/twilio", receiverMessageController.handle);

export { messagesRoutes };
