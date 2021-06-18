import { ICreateCondominiumDTO } from "../dtos/ICreateCondominiumDTO";
import { Condominiums } from "../infra/typeorm/entities/Condominiums";

interface ICondominiumRepository {
  create(data: ICreateCondominiumDTO): Promise<void>;
  findAll(): Promise<Condominiums[]>;
  findByEmail(email: string): Promise<Condominiums>;
}

export { ICondominiumRepository };
