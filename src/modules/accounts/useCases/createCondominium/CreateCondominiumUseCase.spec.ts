import { Connection } from "typeorm";

import { ICreateCondominiumDTO } from "@modules/accounts/dtos/ICreateCondominiumDTO";
import { CondominiumRepository } from "@modules/accounts/infra/typeorm/repositories/CondominiumRepository";
import { OperatorsRepository } from "@modules/accounts/infra/typeorm/repositories/OperatorsRepository";
import { CondominiumRepositoryFirebase } from "@modules/messages/infra/fireorm/repositories/CondominiumRepositoryFirebase";
import { FirebaseAdmin } from "@shared/container/firebase/FirebaseAdmin";
import { AppError } from "@shared/errors/AppError";
import { connection } from "@shared/infra/typeorm/index";

import { CreateCondominiumUseCase } from "./CreateCondominiumUseCase";

let db: Connection;
let operatorsRepository: OperatorsRepository;
let condominiumRepository: CondominiumRepository;
let createCondominiumUseCase: CreateCondominiumUseCase;
let condominiumRepositoryFirebase: CondominiumRepositoryFirebase;
let fireBaseAdmin: FirebaseAdmin;
describe("Create condominium", () => {
  beforeAll(async () => {
    db = await connection();
    await db.runMigrations();
    operatorsRepository = new OperatorsRepository();
    condominiumRepository = new CondominiumRepository();
    condominiumRepositoryFirebase = new CondominiumRepositoryFirebase(
      fireBaseAdmin
    );
    createCondominiumUseCase = new CreateCondominiumUseCase(
      operatorsRepository,
      condominiumRepository,
      condominiumRepositoryFirebase
    );
  });
  afterAll(async () => {
    await db.query(
      "drop table operators; drop table joint_owners; drop table condominiums; drop table migrations;"
    );
    await db.close();
  });

  it("should be able to create a new condominium", async () => {
    const condominiumDTO: ICreateCondominiumDTO = {
      name: "example condominium 1",
      email: "example1@example.com",
      cnpj: "52.237.140/0001-81",
      firebase_id: "eaccf071-465f-4512-989c-0ce4d6489823",
    };
    const condominium = await createCondominiumUseCase.execute(condominiumDTO);
    expect(condominium).toHaveProperty("name");
    expect(condominium).toHaveProperty("email");
    expect(condominium).toHaveProperty("cnpj");
    expect(condominium).toHaveProperty("firebase_id");
  });

  it("should  not be able create a new condominium with an already used email", async () => {
    await expect(async () => {
      await createCondominiumUseCase.execute({
        name: "example condominium2",
        email: "example2@example.com",
        cnpj: "52.237.140/4401-81",
        firebase_id: "eaccf071-465f-4512-989c-0ce4d6489213",
      });
      await createCondominiumUseCase.execute({
        name: "example condominium3",
        email: "example2@example.com",
        cnpj: "52.237.140/0021-13",
        firebase_id: "eaccf071-765f-4512-989c-0ce4d6489823",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
