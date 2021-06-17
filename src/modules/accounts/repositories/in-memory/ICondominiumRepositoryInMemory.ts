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

  async delete(id: string): Promise<Condominiums> {
    const index = this.condominiums.findIndex((cond) => cond.id === id);
    const [condominium] = await this.condominiums.splice(index, 1);

    return condominium;
  }
}

export { CondominiumRepositoryInMemory };
