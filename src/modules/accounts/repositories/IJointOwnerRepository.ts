import { ICreateJointOwnerDTO } from "../dtos/ICreateJointOwnerDTO";
import { JointOwners } from "../infra/typeorm/entities/JointOwners";

interface IJointOwnerRepository {
  create(data: ICreateJointOwnerDTO): Promise<void>;
  listByCondominiumId: (condominium_id: string) => Promise<JointOwners[]>;
  findById: (id: string) => Promise<JointOwners>;
  findByPhone: (phone: string) => Promise<JointOwners>;
  updateById: (id: string, data: ICreateJointOwnerDTO) => Promise<void>;
  delete(id: string): Promise<void>;
}

export { IJointOwnerRepository };
