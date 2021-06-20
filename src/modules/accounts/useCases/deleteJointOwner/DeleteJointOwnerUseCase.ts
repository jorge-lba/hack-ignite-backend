import { inject, injectable } from "tsyringe";

import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  email: string;
}
@injectable()
class DeleteJointOwnerUseCase {
  constructor(
    @inject("JointOwnersRepository")
    private jointOwnersRepository: IJointOwnerRepository,
    @inject("CondominiumRepository")
    private condominiumsRepository: ICondominiumRepository
  ) {}

  async execute({ id, email }: IRequest): Promise<void> {
    const condominium = await this.condominiumsRepository.findByEmail(email);

    if (!condominium) {
      throw new AppError("Email does not belong to an administrator", 403);
    }

    const jointOwner = await this.jointOwnersRepository.findById(id);

    if (!jointOwner) {
      throw new AppError("Joint owner id is not valid");
    }
    if (condominium.id !== jointOwner.condominium_id) {
      throw new AppError("Unauthenticated condominium", 401);
    }
    await this.jointOwnersRepository.delete(id);
  }
}

export { DeleteJointOwnerUseCase };
