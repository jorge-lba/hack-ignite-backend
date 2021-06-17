import { ICreateCondominumDTO } from "../../dtos/ICreateCondominumDTO";
import { Condominiums } from "../../infra/typeorm/entities/Condominiums";
import { ICondominumRepository } from "../ICondominumRepository";

class CondominumRepositoryInMemory implements ICondominumRepository {
  condominiums: Condominiums[] = [];

  async create({
    name,
    email,
    cnpj,
    firebase_id,
  }: ICreateCondominumDTO): Promise<void> {
    const condominum = new Condominiums();

    Object.assign(condominum, {
      name,
      email,
      cnpj,
      firebase_id,
    });
    this.condominiums.push(condominum);
  }

  async findAll(): Promise<Condominiums[]> {
    const all = await this.condominiums;
    return all;
  }

  async delete(id: string): Promise<Condominiums> {
    const index = this.condominiums.findIndex((cond) => cond.id === id);
    return await this.condominiums.splice(index, 1);
  }
}

export { CondominumRepositoryInMemory };
