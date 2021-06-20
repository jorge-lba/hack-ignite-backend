import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { IJointOwnerRepository } from "@modules/accounts/repositories/IJointOwnerRepository";
import { ICondominiumRepositoryFirebase } from "@modules/messages/repositories/ICondominiumRepositoryFirebase";
import { ITelecommunicationProvider } from "@shared/container/providers/TelecommunicationProvider/ITelecommunicationPriovider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  body: string;
  from: string;
  to: string;
  tag: string;
}

@injectable()
class ReceiverMessageUseCase {
  constructor(
    @inject("JointOwnersRepository")
    private jointOwnersRepository: IJointOwnerRepository,
    @inject("CondominiumRepositoryFirebase")
    private condominiumRepositoryFirebase: ICondominiumRepositoryFirebase
  ) {}

  async execute({ body, from, tag }: IRequest) {
    console.log({ body, from, tag });
    const jointOwnerPhone = from.replace("whatsapp:+", "");
    console.log(from);
    const jointOwner = await this.jointOwnersRepository.findByPhone(
      jointOwnerPhone
    );

    const tags = (tag: string) => {
      const options = ["Delivery", "Visitante", "Encomenda"];
      return options[Number(tag)];
    };

    if (!jointOwner) {
      throw new AppError("Joint Owner not is valid!", 401);
    }

    // this.condominiumRepositoryFirebase.create()

    try {
      await this.condominiumRepositoryFirebase.createNotice(
        jointOwner.condominium_id,
        {
          id: uuid(),
          apartment: `${jointOwner.road} ${jointOwner.block} ${jointOwner.number}`,
          body,
          user_id: jointOwner.id,
          name: jointOwner.name,
          sender: "joint-owner",
          tag: tags(tag),
          timestamp: Date.now(),
        }
      );
    } catch (error) {
      console.log(error);
    }

    return {
      apartment: `${jointOwner.road} ${jointOwner.block} ${jointOwner.number}`,
      name: jointOwner.name,
      tag,
      timestamp: Date.now(),
    };
  }
}

export { ReceiverMessageUseCase };
