import { inject, injectable } from "tsyringe";

import { ICreateCondominiumDTO } from "@modules/accounts/dtos/ICreateCondominiumDTO";
import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";

@injectable()
class CreateCondominiumUseCase {
  constructor(
    @inject("CondominiumRepository")
    private condominiumRepository: ICondominiumRepository
  ) {}

  async execute({
    name,
    email,
    cnpj,
    firebase_id,
  }: ICreateCondominiumDTO): Promise<void> {
    const condominiumAlreadyExists =
      await this.condominiumRepository.findByEmail(email);

    if (condominiumAlreadyExists) throw new Error("Condominium already exists");

    await this.condominiumRepository.create({
      name,
      email,
      cnpj,
      firebase_id,
    });
  }
}
