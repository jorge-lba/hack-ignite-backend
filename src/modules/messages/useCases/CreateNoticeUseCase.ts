import { inject, injectable } from "tsyringe";

import { ICreateNoticeDTO } from "../dtos/ICreateNoticeDTO";
import { ICondominiumRepositoryFirebase } from "../repositories/ICondominiumRepositoryFirebase";

@injectable()
class CreateNoticeUseCase {
  constructor(
    @inject("CondominiumRepositoryFirebase")
    private noticeRepository: ICondominiumRepositoryFirebase
  ) {}

  async execute(id: string, data: ICreateNoticeDTO): Promise<void> {
    await this.noticeRepository.createNotice(id, data);
  }
}

export { CreateNoticeUseCase };
