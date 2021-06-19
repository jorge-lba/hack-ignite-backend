import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteOperatorsUseCase } from "./DeleteOperatorsUseCase";

class DeleteOperatorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email } = request.user;

    const deleteOperatorsUseCase = container.resolve(DeleteOperatorsUseCase);

    await deleteOperatorsUseCase.execute({ id, email });

    return response.status(200).send();
  }
}

export { DeleteOperatorController };
