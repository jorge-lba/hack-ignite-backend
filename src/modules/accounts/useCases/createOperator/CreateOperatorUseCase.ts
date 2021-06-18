import { inject, injectable } from "tsyringe";

import { ICreateOperatorDTO } from "@modules/accounts/dtos/ICreateOperatorDTO";
import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateOperatorUseCase {
  constructor(
    @inject("OperatorsRepository")
    private operatorsRepository: IOperatorsRepository,
    @inject("CondominiumsRepository")
    private condominiumsRepository: ICondominiumRepository
  ) {}

  async execute({ email, condominium_id }: ICreateOperatorDTO): Promise<void> {
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

    await this.operatorsRepository.create({
      email,
      condominium_id,
    });
  }
}

export { CreateOperatorUseCase };
