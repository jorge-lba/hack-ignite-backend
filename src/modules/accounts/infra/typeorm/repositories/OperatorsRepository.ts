import { getRepository, Repository } from "typeorm";

import { ICreateOperatorDTO } from "@modules/accounts/dtos/ICreateOperatorDTO";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";

import { Operators } from "../entities/Operators";

class OperatorsRepository implements IOperatorsRepository {
  private repository: Repository<Operators>;

  constructor() {
    this.repository = getRepository(Operators);
  }

  async create({
    email,
    condominium_id,
  }: ICreateOperatorDTO): Promise<Operators> {
    const operator = this.repository.create({
      email,
      condominium_id,
    });

    const result = await this.repository.save(operator);
    return result;
  }

  async findByEmail(email: string): Promise<Operators> {
    const operator = await this.repository.findOne({
      email,
    });

    return operator;
  }

  async findById(id: string): Promise<Operators> {
    const operator = await this.repository.findOne({ id });

    return operator;
  }

  async findOneByFirebaseId(firebase_id: string): Promise<Operators> {
    const operator = await this.repository.findOne({ firebase_id });

    return operator;
  }
  async listByCondominiumId(condominium_id: string): Promise<Operators[]> {
    const operators = await this.repository.find({ condominium_id });

    return operators;
  }

  async updateByEmail(
    email: string,
    { name, firebase_id }: ICreateOperatorDTO
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ name, firebase_id })
      .where("email = :email")
      .setParameters({ email })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}

export { OperatorsRepository };
