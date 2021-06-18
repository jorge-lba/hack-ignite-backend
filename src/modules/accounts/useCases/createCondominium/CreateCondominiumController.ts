import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCondominiumUseCase } from "./CreateCondominiumUseCase";

class CreateCondominiumController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, firebase_id } = request.user;
    const { name, cnpj } = request.body;

    const createCondominiumUseCase = container.resolve(
      CreateCondominiumUseCase
    );

    await createCondominiumUseCase.execute({ name, email, cnpj, firebase_id });

    return response.status(201).send();
  }
}

export { CreateCondominiumController };
