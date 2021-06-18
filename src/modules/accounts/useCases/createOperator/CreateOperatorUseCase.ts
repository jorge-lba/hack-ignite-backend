import { inject, injectable } from "tsyringe";

import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_email: string;
  email: string;
}

@injectable()
class CreateOperatorUseCase {
  constructor(
    @inject("OperatorsRepository")
    private operatorsRepository: IOperatorsRepository,
    @inject("CondominiumsRepository")
    private condominiumsRepository: ICondominiumRepository
  ) {}

  async execute({ email, user_email }: IRequest): Promise<void> {
    const operatorAlreadyExists = await this.operatorsRepository.findByEmail(
      email
    );

    if (operatorAlreadyExists) {
      throw new AppError("Operator already exists!");
    }

    const condominiumAlreadyExists =
      await this.condominiumsRepository.findByEmail(email);

    if (condominiumAlreadyExists) {
      throw new AppError("Email is being used!");
    }

    const condominium = await this.condominiumsRepository.findByEmail(
      user_email
    );

    await this.operatorsRepository.create({
      email,
      condominium_id: condominium.id,
    });
  }
}

export { CreateOperatorUseCase };
