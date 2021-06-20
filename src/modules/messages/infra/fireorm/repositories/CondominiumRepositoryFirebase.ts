import * as fireorm from "fireorm";
import { BaseFirestoreRepository, getRepository } from "fireorm";
import { inject, injectable, singleton } from "tsyringe";

import { ICreateCondominiumFirebaseDTO } from "@modules/messages/dtos/ICreateCondominiumDTO";
import { ICreateNoticeDTO } from "@modules/messages/dtos/ICreateNoticeDTO";
import { ICondominiumRepositoryFirebase } from "@modules/messages/repositories/ICondominiumRepositoryFirebase";
import { IFirebaseAdmin } from "@shared/container/firebase/IFirebaseAdmin";

import { Condominiums } from "../collections/Condominiums";

@singleton()
@injectable()
class CondominiumRepositoryFirebase implements ICondominiumRepositoryFirebase {
  private repository: BaseFirestoreRepository<Condominiums>;

  constructor(
    @inject("FirebaseAdmin")
    private firebaseAdmin: IFirebaseAdmin
  ) {
    fireorm.initialize(this.firebaseAdmin.firestore);
    this.repository = getRepository(Condominiums);
  }

  async create({ id, name }: ICreateCondominiumFirebaseDTO): Promise<void> {
    await this.repository.create({ id, name });
  }

  async createNotice(id: string, data: ICreateNoticeDTO): Promise<void> {
    const condominium = await this.repository.findById(id);
    await condominium.notices.create(data);
  }
}

export { CondominiumRepositoryFirebase };
