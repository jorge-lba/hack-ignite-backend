import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteJointOwnerUseCase } from "./DeleteJointOwnerUseCase";

class DeleteJointOwnerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email } = request.user;

    const deleteJointOwnerUseCase = container.resolve(DeleteJointOwnerUseCase);

    await deleteJointOwnerUseCase.execute({ id, email });

    return response.status(200).send();
  }
}

export { DeleteJointOwnerController };
