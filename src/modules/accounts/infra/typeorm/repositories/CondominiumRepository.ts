import { getRepository, Repository } from "typeorm";

import { ICreateCondominiumDTO } from "@modules/accounts/dtos/ICreateCondominiumDTO";
import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";

import { Condominiums } from "../entities/Condominiums";

class CondominiumRepository implements ICondominiumRepository {
  private repository: Repository<Condominiums>;

  constructor() {
    this.repository = getRepository(Condominiums);
  }

  async create({
    firebase_id,
    email,
    name,
  }: ICreateCondominiumDTO): Promise<void> {
    const condominium = this.repository.create({
      email,
      name,
      firebase_id,
    });

    await this.repository.save(condominium);
  }

  async findAll(): Promise<Condominiums[]> {
    const condominiums = await this.repository.find();
    return condominiums;
  }

  async findByEmail(email: string): Promise<Condominiums> {
    const condominium = await this.repository.findOne({
      email,
    });

    return condominium;
  }

  async findOneByFirebaseId(firebase_id: string): Promise<Condominiums> {
    const condominium = await this.repository.findOne({ firebase_id });

    return condominium;
  }

  async delete(condominium_id: string): Promise<void> {
    await this.repository.delete({
      id: condominium_id,
    });
  }
}

export { CondominiumRepository };
