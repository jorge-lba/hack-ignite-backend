import { inject, injectable } from "tsyringe";

import { ICondominiumRepository } from "@modules/accounts/repositories/ICondominiumRepository";
import { IOperatorsRepository } from "@modules/accounts/repositories/IOperatorsRepository";
import { IAuthProvider } from "@shared/container/providers/AuthProvider/IAuthProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  email: string;
}
@injectable()
class DeleteOperatorsUseCase {
  constructor(
    @inject("OperatorsRepository")
    private operatorsRepository: IOperatorsRepository,
    @inject("CondominiumRepository")
    private condominiumsRepository: ICondominiumRepository,
    @inject("AuthProvider")
    private authProvider: IAuthProvider
  ) {}

  async execute({ id, email }: IRequest): Promise<void> {
    const condominium = await this.condominiumsRepository.findByEmail(email);

    if (!condominium) {
      throw new AppError("Email does not belong to an administrator", 403);
    }
    const operator = await this.operatorsRepository.findById(id);

    if (!operator) {
      throw new AppError("Operator id is not valid");
    }

    await this.operatorsRepository.delete(id);

    await this.authProvider.deleteUser(operator.firebase_id);
  }
}

export { DeleteOperatorsUseCase };
