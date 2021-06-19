import { ICreateOperatorDTO } from "../dtos/ICreateOperatorDTO";
import { Operators } from "../infra/typeorm/entities/Operators";

interface IOperatorsRepository {
  create: ({ email, condominium_id }: ICreateOperatorDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<Operators>;
  listByCondominiumId: (condominium_id: string) => Promise<Operators[]>;
  updateByEmail: (email: string, { name, firebase_id }) => Promise<void>;
}

export { IOperatorsRepository };
