import { inject, injectable } from "tsyringe";

import { Operators } from "@modules/accounts/infra/typeorm/entities/Operators";
import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListOperatorsUseCase {
  constructor(
    @inject("OperatorsRepository")
    private operatorRepository: IOperatorsRepository,
    @inject("CondominiumRepository")
    private condominiumsRepository: ICondominiumRepository
  ) {}

  async execute(firebase_id: string): Promise<Operators[]> {
    const condominium = await this.condominiumsRepository.findOneByFirebaseId(
      firebase_id
    );

    if (!condominium) {
      throw new AppError("Condominium is not valid!");
    }

    const operators = await this.operatorRepository.listByCondominiumId(
      condominium.id
    );

    return operators;
  }
}

export { ListOperatorsUseCase };
