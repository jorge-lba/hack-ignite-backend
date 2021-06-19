import { inject, injectable } from "tsyringe";

import { JointOwners } from "@modules/accounts/infra/typeorm/entities/JointOwners";
import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListJointOwnersByIdUseCase {
  constructor(
    @inject("JointOwnersRepository")
    private jointOwnersRepository: IJointOwnerRepository,
    @inject("OperatorsRepository")
    private operatorRepository: IOperatorsRepository
  ) {}

  async execute(firebase_id: string, id: string): Promise<JointOwners> {
    const isAuthenticate = await this.operatorRepository.findOneByFirebaseId(
      firebase_id
    );
    if (!isAuthenticate) {
      throw new AppError("Operator is not valid", 401);
    }

    const jointOwner = await this.jointOwnersRepository.findById(id);

    return jointOwner;
  }
}

export { ListJointOwnersByIdUseCase };
