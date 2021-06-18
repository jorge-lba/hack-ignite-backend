import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Condominiums } from "./Condominiums";

@Entity()
class Operators {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Condominiums)
  @JoinColumn({ name: "condominium_id" })
  condominium: Condominiums;

  @Column()
  name?: string;

  @Column()
  email: string;

  @Column()
  firebase_id?: string;

  @Column()
  condominium_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = this.id ?? uuid();
  }
}

export { Operators };
