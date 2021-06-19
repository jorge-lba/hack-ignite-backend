import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListJointOwnersUseCase } from "./ListJointOwnersUseCase";

class ListJointOwnersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { firebase_id } = request.user;

    const listJointOwnersUseCase = container.resolve(ListJointOwnersUseCase);

    const jointOwners = await listJointOwnersUseCase.execute(firebase_id);

    return response.status(201).json(jointOwners);
  }
}

export { ListJointOwnersController };
