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
class JointOwners {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Condominiums)
  @JoinColumn({ name: "condominiums_id" })
  condominium: Condominiums;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  road: string;

  @Column()
  block: string;

  @Column()
  number: number;

  @Column()
  condominiums_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = this.id ?? uuid();
  }
}

export { JointOwners };
