import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListJointOwnersByIdUseCase } from "./ListJointOwnersByIdUseCase";

class ListJointOwnersByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { firebase_id } = request.user;
    const { id } = request.params;
    const listJointOwnersByIdUseCase = container.resolve(
      ListJointOwnersByIdUseCase
    );

    const jointOwners = await listJointOwnersByIdUseCase.execute(
      firebase_id,
      id
    );

    return response.status(200).json(jointOwners);
  }
}

export { ListJointOwnersByIdController };
