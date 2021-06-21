import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReceiverMessageUseCase } from "./ReceiverMessageUseCase";

interface IRequest {
  body: string;
  from: string;
  to: string;
  tag: string;
}

class ReceiverMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body, from, tag, to } = request.body as IRequest;

    const receiverMessageUseCase = container.resolve(ReceiverMessageUseCase);

    const data = await receiverMessageUseCase.execute({ body, from, tag, to });

    return response.status(201).json({ ...data });
  }
}

export { ReceiverMessageController };
