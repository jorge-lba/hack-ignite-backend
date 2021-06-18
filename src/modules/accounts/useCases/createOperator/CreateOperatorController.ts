import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateOperatorUseCase } from "./CreateOperatorUseCase";

class CreateOperatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const { email: user_email } = request.user;
    const { email, user_email } = request.body;

    const createOperatorUseCase = container.resolve(CreateOperatorUseCase);

    await createOperatorUseCase.execute({ email, user_email });

    return response.status(201).send();
  }
}

export { CreateOperatorController };
