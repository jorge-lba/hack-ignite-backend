import { getRepository, Repository } from "typeorm";

import { ICreateJointOwnerDTO } from "@modules/accounts/dtos/ICreateJointOwnerDTO";
import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";

import { JointOwners } from "../entities/JointOwners";

class JointOwnersRepository implements JointOwners {
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
}

export { JointOwnersRepository };
