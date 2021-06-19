import { inject, injectable } from "tsyringe";

import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  phone: string;
  road?: string;
  block?: string;
  number: number;
  condominium_id: string;
  firebase_id: string;
}

@injectable()
class CreateJointOwnerUseCase {
  constructor(
    @inject("JointOwnersRepository")
    private jointOwnersRepository: IJointOwnerRepository,
    @inject("CondominiumRepository")
    private condominiumRepository: ICondominiumRepository
  ) {}
  async execute({
    name,
    phone,
    road,
    block,
    number,
    condominium_id,
    firebase_id,
  }: IRequest): Promise<void> {
    const isAuthenticate = await this.condominiumRepository.findOneByFirebaseId(
      firebase_id
    );
    if (!isAuthenticate) {
      throw new AppError("Unauthenticated condominium", 401);
    }
    const phoneAlreadyExists = await this.jointOwnersRepository.findByPhone(
      phone
    );

    if (!phoneAlreadyExists) {
      throw new AppError("Phone already registered");
    }

    await this.jointOwnersRepository.create({
      name,
      phone,
      road,
      block,
      number,
      condominium_id: isAuthenticate.id,
    });
  }
}

export { CreateJointOwnerUseCase };
