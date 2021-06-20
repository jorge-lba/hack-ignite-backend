import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateNoticeDTO } from "../dtos/ICreateNoticeDTO";
import { CreateNoticeUseCase } from "./CreateNoticeUseCase";

class CreateNoticeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, user_id } = request.params;
    const { name, body, timestamp, apartment, tag, sender } = request.body;

    const data = {
      user_id,
      name,
      body,
      timestamp,
      apartment,
      tag,
      sender,
    } as ICreateNoticeDTO;

    const createNoticeUseCase = container.resolve(CreateNoticeUseCase);
    await createNoticeUseCase.execute(id, data);

    return response.status(201).send();
  }
}

export { CreateNoticeController };
