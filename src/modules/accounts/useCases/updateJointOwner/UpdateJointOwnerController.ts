import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateJointOwnerUseCase } from "./UpdateJointOwnerUseCase";

class UpdateJointOwnerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { firebase_id } = request.user;
    const { id } = request.params;
    const { name, phone, road, block, number } = request.body;

    const updateJointOwnerUseCase = container.resolve(UpdateJointOwnerUseCase);

    await updateJointOwnerUseCase.execute(id, firebase_id, {
      name,
      phone,
      road,
      block,
      number,
    });
    return response.status(201).send();
  }
}

export { UpdateJointOwnerController };
