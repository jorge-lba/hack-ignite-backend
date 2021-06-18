import { ICreateCondominiumDTO } from "../../dtos/ICreateCondominiumDTO";
import { Condominiums } from "../../infra/typeorm/entities/Condominiums";
import { ICondominiumRepository } from "../ICondominiumRepository";

class CondominiumRepositoryInMemory implements ICondominiumRepository {
  condominiums: Condominiums[] = [];

  async create({
    name,
    email,
    cnpj,
    firebase_id,
  }: ICreateCondominiumDTO): Promise<void> {
    const condominium = new Condominiums();

    Object.assign(condominium, {
      name,
      email,
      cnpj,
      firebase_id,
    });
    this.condominiums.push(condominium);
  }

  async findAll(): Promise<Condominiums[]> {
    const all = await this.condominiums;
    return all;
  }
  async findByEmail(email: string): Promise<Condominiums> {
    const result = await this.condominiums.find((cond) => cond.email === email);

    return result;
  }

  async delete(id: string): Promise<void> {
    const index = this.condominiums.findIndex((cond) => cond.id === id);
    await this.condominiums.splice(index, 1);
  }
}

export { CondominiumRepositoryInMemory };
