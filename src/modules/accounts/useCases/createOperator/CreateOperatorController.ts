import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateOperatorUseCase } from "./CreateOperatorUseCase";

class CreateOperatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email: user_email } = request.user;
    const { email } = request.body;

    const createOperatorUseCase = container.resolve(CreateOperatorUseCase);

    const result = await createOperatorUseCase.execute({ email, user_email });

    return response.status(201).send(result);
  }
}

export { CreateOperatorController };
