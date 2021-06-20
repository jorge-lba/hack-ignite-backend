import { inject, injectable } from "tsyringe";

import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name?: string;
  phone?: string;
  road?: string;
  block?: string;
  number?: number;
}
@injectable()
class UpdateJointOwnerUseCase {
  constructor(
    @inject("JointOwnersRepository")
    private jointOwnersRepository: IJointOwnerRepository,
    @inject("CondominiumRepository")
    private condominiumsRepository: ICondominiumRepository
  ) {}
  async execute(
    id: string,
    firebase_id: string,
    { name, phone, road, block, number }: IRequest
  ): Promise<void> {
    const isAuthenticate =
      await this.condominiumsRepository.findOneByFirebaseId(firebase_id);
    if (!isAuthenticate) {
      throw new AppError("Unauthenticated condominium", 401);
    }
    const jointOwner = await this.jointOwnersRepository.findById(id);
    if (isAuthenticate.id !== jointOwner.condominium_id) {
      throw new AppError("Unauthenticated condominium", 401);
    }
    const phoneAlreadyExists = await this.jointOwnersRepository.findByPhone(
      phone
    );

    if (phoneAlreadyExists) {
      throw new AppError("Phone already registered");
    }
    const newjointOwner = Object.assign(jointOwner, {
      name: name || jointOwner.name,
      phone: phone || jointOwner.phone,
      road,
      block,
      number: number || jointOwner.number,
    });
    await this.jointOwnersRepository.updateById(id, newjointOwner);
  }
}

export { UpdateJointOwnerUseCase };
