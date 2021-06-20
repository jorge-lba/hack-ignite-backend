import { ICreateNoticeDTO } from "./ICreateNoticeDTO";

interface ICreateCondominiumFirebaseDTO {
  id: string;
  name: string;
  notice?: ICreateNoticeDTO;
}

export { ICreateCondominiumFirebaseDTO };
