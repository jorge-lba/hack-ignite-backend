import * as fireorm from "fireorm";
import { BaseFirestoreRepository, getRepository } from "fireorm";
import { injectable } from "tsyringe";

import { ICreateCondominiumDTO } from "@modules/messages/dtos/ICreateCondominiumDTO";
import { ICondominiumRepository } from "@modules/messages/repositories/ICondominiumRepository";
import { FirebaseAdmin } from "@shared/container/firebase/FirebaseAdmin";

import { Condominiums } from "../collections/Condominiums";

class CondominiumRepository implements ICondominiumRepository {
  private repository: BaseFirestoreRepository<Condominiums>;
  private firebaseadmin = new FirebaseAdmin();

  constructor() {
    this.repository = getRepository(Condominiums);
    fireorm.initialize(this.firebaseadmin.firestore);
  }

  async create({ id, name }: ICreateCondominiumDTO): Promise<void> {
    await this.repository.create({ id, name });
  }
}

export { CondominiumRepository };

const condominium = new CondominiumRepository();
condominium.create({ id: "uuid", name: "zé" });
