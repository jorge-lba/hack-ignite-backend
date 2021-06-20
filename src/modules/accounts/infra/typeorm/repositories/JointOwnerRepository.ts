import { getRepository, Repository } from "typeorm";

import { ICreateJointOwnerDTO } from "@modules/accounts/dtos/ICreateJointOwnerDTO";
import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";

import { JointOwners } from "../entities/JointOwners";

class JointOwnersRepository implements IJointOwnerRepository {
  private repository: Repository<JointOwners>;

  constructor() {
    this.repository = getRepository(JointOwners);
  }

  async create({
    name,
    phone,
    road,
    block,
    number,
    condominium_id,
  }: ICreateJointOwnerDTO): Promise<void> {
    const jointOwner = this.repository.create({
      name,
      phone,
      road,
      block,
      number,
      condominium_id,
    });

    await this.repository.save(jointOwner);
  }

  async listByCondominiumId(condominium_id: string): Promise<JointOwners[]> {
    const jointOwner = await this.repository.find({ condominium_id });

    return jointOwner;
  }
  async findById(id: string): Promise<JointOwners> {
    const jointOwner = await this.repository.findOne({ id });

    return jointOwner;
  }
  async findByPhone(phone: string): Promise<JointOwners> {
    const jointOwner = await this.repository.findOne({ phone });

    return jointOwner;
  }
  async updateById(id: string, data?: ICreateJointOwnerDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}

export { JointOwnersRepository };
