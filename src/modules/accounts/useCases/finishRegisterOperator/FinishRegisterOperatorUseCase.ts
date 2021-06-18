import { inject, injectable } from "tsyringe";

import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  firebase_id: string;
}

@injectable()
class FinishRegisterOperatorUseCase {
  constructor(
    @inject("OperatorsRepository")
    private operatorsRepository: IOperatorsRepository,
    @inject("CondominiumRepository")
    private condominiumsRepository: ICondominiumRepository
  ) {}
  async execute({ name, email, firebase_id }: IRequest): Promise<void> {
    const operatorExists = await this.operatorsRepository.findByEmail(email);
    if (!operatorExists) {
      throw new AppError("Operator not Exists", 404);
    }

    await this.operatorsRepository.updateByEmail(email, { name, firebase_id });
  }
}

export { FinishRegisterOperatorUseCase };
