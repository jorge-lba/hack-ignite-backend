import { Collection, SubCollection, ISubCollection } from "fireorm";

import { Operators } from "./Operators";

@Collection()
export class Condominiums {
  id: string;
  name: string;

  @SubCollection(Operators)
  operators?: ISubCollection<Operators>;
}
