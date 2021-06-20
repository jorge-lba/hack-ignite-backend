import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateJointOwnerUseCase } from "./CreateJointOwnerUseCase";

class CreateJointOwnerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { firebase_id } = request.user;
    const { name, phone, road, block, number } = request.body;

    const createJointOwnerUseCase = container.resolve(CreateJointOwnerUseCase);

    const result = await createJointOwnerUseCase.execute({
      name,
      phone,
      road,
      block,
      number,
      firebase_id,
    });

    return response.status(201).send(result);
  }
}

export { CreateJointOwnerController };
