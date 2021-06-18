import { getRepository, Repository } from "typeorm";

import { ICreateOperatorDTO } from "@modules/accounts/dtos/ICreateOperatorDTO";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";

import { Operators } from "../entities/Operators";

class OperatorsRepository implements IOperatorsRepository {
  private repository: Repository<Operators>;

  constructor() {
    this.repository = getRepository(Operators);
  }

  async create({ email, condominium_id }: ICreateOperatorDTO): Promise<void> {
    const operator = this.repository.create({
      email,
      condominium_id,
    });

    await this.repository.save(operator);
  }

  async findByEmail(email: string): Promise<Operators> {
    const operator = this.repository.findOne({
      email,
    });

    return operator;
  }
}

export { OperatorsRepository };