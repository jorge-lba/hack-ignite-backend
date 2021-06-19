import { inject, injectable } from "tsyringe";

import { JointOwners } from "@modules/accounts/infra/typeorm/entities/JointOwners";
import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListJointOwnersUseCase {
  constructor(
    @inject("JointOwnersRepository")
    private jointOwnersRepository: IJointOwnerRepository,
    @inject("CondominiumRepository")
    private condominiumsRepository: ICondominiumRepository
  ) {}

  async execute(firebase_id: string): Promise<JointOwners[]> {
    const condominium = await this.condominiumsRepository.findOneByFirebaseId(
      firebase_id
    );

    if (!condominium) {
      throw new AppError("Condominium is not valid!");
    }

    const jointOwners = await this.jointOwnersRepository.listByCondominiumId(
      condominium.id
    );

    return jointOwners;
  }
}

export { ListJointOwnersUseCase };
