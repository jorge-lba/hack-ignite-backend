import * as fireorm from "fireorm";
import { BaseFirestoreRepository, getRepository } from "fireorm";
import { inject, injectable, singleton } from "tsyringe";

import { ICreateCondominiumDTO } from "@modules/messages/dtos/ICreateCondominiumDTO";
import { ICondominiumRepository } from "@modules/messages/repositories/ICondominiumRepository";
import { IFirebaseAdmin } from "@shared/container/firebase/IFirebaseAdmin";

import { Condominiums } from "../collections/Condominiums";

@singleton()
@injectable()
class CondominiumRepositoryFirebase implements ICondominiumRepository {
  private repository: BaseFirestoreRepository<Condominiums>;

  constructor(
    @inject("FirebaseAdmin")
    private firebaseAdmin: IFirebaseAdmin
  ) {
    fireorm.initialize(this.firebaseAdmin.firestore);
  }

  async create({ id, name }: ICreateCondominiumDTO): Promise<void> {
    this.repository = getRepository(Condominiums);
    await this.repository.create({ id, name });
  }
}

export { CondominiumRepositoryFirebase };
