import { ICreateCondominiumDTO } from "../dtos/ICreateCondominiumDTO";
import { Condominiums } from "../infra/typeorm/entities/Condominiums";

interface ICondominiumRepository {
  create(data: ICreateCondominiumDTO): Promise<void>;
  findAll(): Promise<Condominiums[]>;
  findByEmail(email: string): Promise<Condominiums>;
  findOneByFirebaseId(firebase_id: string): Promise<Condominiums>;
  delete(id: string): Promise<void>;
}

export { ICondominiumRepository };
