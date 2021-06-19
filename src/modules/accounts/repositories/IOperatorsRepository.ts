import { ICreateOperatorDTO } from "../dtos/ICreateOperatorDTO";
import { Operators } from "../infra/typeorm/entities/Operators";

interface IOperatorsRepository {
  create: ({ email, condominium_id }: ICreateOperatorDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<Operators>;
  findById: (id: string) => Promise<Operators>;
  findOneByFirebaseId(firebase_id: string): Promise<Operators>;
  listByCondominiumId: (condominium_id: string) => Promise<Operators[]>;
<<<<<<< HEAD
  updateByEmail: (
    email: string,
    { name, firebase_id }: ICreateOperatorDTO
  ) => Promise<void>;
=======
  updateByEmail: (email: string, { name, firebase_id }) => Promise<void>;
  delete(id: string): Promise<void>;
>>>>>>> 122e93c5adc588c612ec560203efaf96661e9a29
}

export { IOperatorsRepository };
