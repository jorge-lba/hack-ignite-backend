import { ICreateCondominumDTO } from "../dtos/ICreateCondominumDTO";
import { Condominiums } from "../infra/typeorm/entities/Condominiums";

interface ICondominumRepository {
  create(data: ICreateCondominumDTO): Promise<void>;
  findAll(): Promise<Condominiums[]>;
  delete(id: string): Promise<Condominiums>;
}

export { ICondominumRepository };
