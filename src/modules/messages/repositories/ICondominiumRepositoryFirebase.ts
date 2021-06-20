import { ICreateCondominiumFirebaseDTO } from "@modules/messages/dtos/ICreateCondominiumDTO";

import { ICreateNoticeDTO } from "../dtos/ICreateNoticeDTO";

interface ICondominiumRepositoryFirebase {
  create(data: ICreateCondominiumFirebaseDTO): Promise<void>;
  createNotice(id: string, data: ICreateNoticeDTO): Promise<void>;
}

export { ICondominiumRepositoryFirebase };
