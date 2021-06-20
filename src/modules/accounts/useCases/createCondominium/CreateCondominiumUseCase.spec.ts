import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { ICreateCondominiumDTO } from "@modules/accounts/dtos/ICreateCondominiumDTO";
import { CondominiumRepository } from "@modules/accounts/infra/typeorm/repositories/CondominiumRepository";
import { OperatorsRepository } from "@modules/accounts/infra/typeorm/repositories/OperatorsRepository";
import { AppError } from "@shared/errors/AppError";
import { connection } from "@shared/infra/typeorm/index";

import { CreateCondominiumUseCase } from "./CreateCondominiumUseCase";

let db: Connection;
let operatorsRepository: OperatorsRepository;
let condominiumRepository: CondominiumRepository;
let createCondominiumUseCase: CreateCondominiumUseCase;
describe("Create condominium", () => {
  beforeAll(async () => {
    db = await connection();
    await db.runMigrations();
    operatorsRepository = new OperatorsRepository();
    condominiumRepository = new CondominiumRepository();
    createCondominiumUseCase = new CreateCondominiumUseCase(
      operatorsRepository,
      condominiumRepository
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
      name: "example",
      email: "example@contente.com",
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
        name: "vila contente",
        email: "vila@contente.com",
        cnpj: "52.237.140/0001-81",
        firebase_id: "eaccf071-465f-4512-989c-0ce4d6489823",
      });
      await createCondominiumUseCase.execute({
        name: "vila contente",
        email: "vila@contente.com",
        cnpj: "52.237.140/0001-81",
        firebase_id: "eaccf071-465f-4512-989c-0ce4d6489823",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
