import { Request, Response } from "express";
import { container } from "tsyringe";

import { FinishRegisterOperatorUseCase } from "./FinishRegisterOperatorUseCase";

class FinishRegisterOperatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, firebase_id } = request.user;
    const { name } = request.body;

    const finishRegisterUseCase = container.resolve(
      FinishRegisterOperatorUseCase
    );

    await finishRegisterUseCase.execute({ name, email, firebase_id });

    return response.status(201).send();
  }
}

export { FinishRegisterOperatorController };
