import { ICreateCondominiumDTO } from "../dtos/ICreateCondominiumDTO";
import { Condominiums } from "../infra/typeorm/entities/Condominiums";

interface ICondominiumRepository {
  create(data: ICreateCondominiumDTO): Promise<void>;
  findAll(): Promise<Condominiums[]>;
  delete(id: string): Promise<Condominiums>;
}

export { ICondominiumRepository };
