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
    name,
    email,
    cnpj,
    firebase_id,
  }: ICreateCondominiumDTO): Promise<void> {
    const condominium = this.repository.create({
      name,
      email,
      cnpj,
      firebase_id,
    });

    await this.repository.save(condominium);
  }

  async findAll(): Promise<Condominiums[]> {
    const all = await this.repository.find();

    return all;
  }
  async findByEmail(email: string): Promise<Condominiums> {
    const condominium = await this.repository.findOne({ email });
    return condominium;
  }
}

export { CondominiumRepository };
