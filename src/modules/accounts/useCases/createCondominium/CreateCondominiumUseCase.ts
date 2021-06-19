import { inject, injectable } from "tsyringe";

import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  cnpj: string;
  firebase_id: string;
}

@injectable()
class CreateCondominiumUseCase {
  constructor(
    @inject("OperatorsRepository")
    private operatorsRepository: IOperatorsRepository,
    @inject("CondominiumRepository")
    private condominiumRepository: ICondominiumRepository
  ) {}

  async execute({ name, email, cnpj, firebase_id }: IRequest): Promise<void> {
    const condominiumAlreadyExists =
      await this.condominiumRepository.findByEmail(email);

    if (condominiumAlreadyExists) {
      throw new AppError("Condominium already exists");
    }
    const operatorAlreadyExists = await this.operatorsRepository.findByEmail(
      email
    );

    if (operatorAlreadyExists) {
      throw new AppError("Email is being used!");
    }

    await this.condominiumRepository.create({
      name,
      email,
      cnpj,
      firebase_id,
    });
  }
}

export { CreateCondominiumUseCase };
