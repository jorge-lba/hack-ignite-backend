import { Connection } from "typeorm";

import { ICreateCondominiumDTO } from "@modules/accounts/dtos/ICreateCondominiumDTO";
import { CondominiumRepository } from "@modules/accounts/infra/typeorm/repositories/CondominiumRepository";
import { JointOwnersRepository } from "@modules/accounts/infra/typeorm/repositories/JointOwnerRepository";
import { OperatorsRepository } from "@modules/accounts/infra/typeorm/repositories/OperatorsRepository";
import { CondominiumRepositoryFirebase } from "@modules/messages/infra/fireorm/repositories/CondominiumRepositoryFirebase";
import { FirebaseAdmin } from "@shared/container/firebase/FirebaseAdmin";
import { AppError } from "@shared/errors/AppError";
import { connection } from "@shared/infra/typeorm/index";

import { CreateCondominiumUseCase } from "../createCondominium/CreateCondominiumUseCase";
import { CreateJointOwnerUseCase } from "./CreateJointOwnerUseCase";

interface IRequest {
  name: string;
  phone: string;
  road?: string;
  block?: string;
  number: number;
  condominium_id?: string;
  firebase_id: string;
}

let db: Connection;
let condominiumRepository: CondominiumRepository;
let jointOwnersRepository: JointOwnersRepository;
let createJointOwnerUseCase: CreateJointOwnerUseCase;
let operatorsRepository: OperatorsRepository;
let createCondominiumUseCase: CreateCondominiumUseCase;
let condominiumRepositoryFirebase: CondominiumRepositoryFirebase;
let fireBaseAdmin: FirebaseAdmin;
describe("Create JointOwner", () => {
  beforeAll(async () => {
    db = await connection();
    await db.runMigrations();
    condominiumRepository = new CondominiumRepository();
    operatorsRepository = new OperatorsRepository();
    jointOwnersRepository = new JointOwnersRepository();
    createJointOwnerUseCase = new CreateJointOwnerUseCase(
      jointOwnersRepository,
      condominiumRepository
    );
    condominiumRepositoryFirebase = new CondominiumRepositoryFirebase(
      fireBaseAdmin
    );
    createCondominiumUseCase = new CreateCondominiumUseCase(
      operatorsRepository,
      condominiumRepository,
      condominiumRepositoryFirebase
    );
    const condominiumDTO: ICreateCondominiumDTO = {
      name: "example condominium 1",
      email: "example1@example.com",
      cnpj: "52.237.140/0001-81",
      firebase_id: "eaccf071-465f-4512-989c-0ce4d6489823",
    };
    await createCondominiumUseCase.execute(condominiumDTO);
  });
  afterAll(async () => {
    await db.query(
      "drop table operators; drop table joint_owners; drop table condominiums; drop table migrations;"
    );
    await db.close();
  });

  it("should be able to create a new joint owner", async () => {
    const jointOwnersDTO: IRequest = {
      name: "exampleName",
      phone: "51 1845-5456",
      road: "example road1",
      block: "example block1",
      number: 1,
      firebase_id: "eaccf071-465f-4512-989c-0ce4d6489823",
    };
    const jointOwner = await createJointOwnerUseCase.execute(jointOwnersDTO);
    expect(jointOwner).toHaveProperty("name");
    expect(jointOwner).toHaveProperty("phone");
    expect(jointOwner).toHaveProperty("road");
    expect(jointOwner).toHaveProperty("block");
    expect(jointOwner).toHaveProperty("number");
    expect(jointOwner).toHaveProperty("condominium_id");
  });

  it("should  not be able create a new joint owner with an already used phone", async () => {
    await expect(async () => {
      await createJointOwnerUseCase.execute({
        name: "example2Name",
        phone: "51 9845-5456",
        road: "example road1",
        block: "example block1",
        number: 1,
        firebase_id: "eaccf071-465f-4512-989c-0ce4d6489823",
      });
      await createJointOwnerUseCase.execute({
        name: "example3Name",
        phone: "51 9845-5456",
        road: "example road1",
        block: "example block1",
        number: 4,
        firebase_id: "eaccf071-465f-4512-989c-0ce4d6489823",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should  not be able create a new joint owner with an condominium not authenticated", async () => {
    await expect(async () => {
      await createJointOwnerUseCase.execute({
        name: "example2Name",
        phone: "51 9477-5456",
        road: "example road1",
        block: "example block1",
        number: 1,
        firebase_id: "eaccf071-465f-4512-989c-0ce4d6s89823",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
