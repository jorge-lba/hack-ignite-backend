import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListOperatorsUseCase } from "./ListOperatorsUseCase";

class ListOperatorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { firebase_id } = request.user;

    const listOperatorsUseCase = container.resolve(ListOperatorsUseCase);

    const operators = await listOperatorsUseCase.execute(firebase_id);

    return response.status(201).json(operators);
  }
}

export { ListOperatorsController };
