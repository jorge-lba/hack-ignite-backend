import { ICreateCondominiumDTO } from "@modules/messages/dtos/ICreateCondominiumDTO";

interface ICondominiumRepository {
  create(data: ICreateCondominiumDTO): Promise<void>;
}

export { ICondominiumRepository };
