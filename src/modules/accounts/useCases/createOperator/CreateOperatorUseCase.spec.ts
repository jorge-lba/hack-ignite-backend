import { Connection } from "typeorm";

import { ICreateCondominiumDTO } from "@modules/accounts/dtos/ICreateCondominiumDTO";
import { CondominiumRepository } from "@modules/accounts/infra/typeorm/repositories/CondominiumRepository";
import { OperatorsRepository } from "@modules/accounts/infra/typeorm/repositories/OperatorsRepository";
import { CondominiumRepositoryFirebase } from "@modules/messages/infra/fireorm/repositories/CondominiumRepositoryFirebase";
import { FirebaseAdmin } from "@shared/container/firebase/FirebaseAdmin";
import { AppError } from "@shared/errors/AppError";
import { connection } from "@shared/infra/typeorm/index";

import { CreateCondominiumUseCase } from "../createCondominium/CreateCondominiumUseCase";
import { CreateOperatorUseCase } from "./CreateOperatorUseCase";

interface IRequest {
  email: string;
  user_email: string;
}

let db: Connection;
let condominiumRepository: CondominiumRepository;
let operatorsRepository: OperatorsRepository;
let createCondominiumUseCase: CreateCondominiumUseCase;
let createOperatorUseCase: CreateOperatorUseCase;
let condominiumRepositoryFirebase: CondominiumRepositoryFirebase;
let fireBaseAdmin: FirebaseAdmin;
describe("Create Operator", () => {
  beforeAll(async () => {
    db = await connection();
    await db.runMigrations();
    condominiumRepository = new CondominiumRepository();
    operatorsRepository = new OperatorsRepository();
    condominiumRepositoryFirebase = new CondominiumRepositoryFirebase(
      fireBaseAdmin
    );
    createCondominiumUseCase = new CreateCondominiumUseCase(
      operatorsRepository,
      condominiumRepository,
      condominiumRepositoryFirebase
    );
    createOperatorUseCase = new CreateOperatorUseCase(
      operatorsRepository,
      condominiumRepository
    );

    const condominiumDTO: ICreateCondominiumDTO = {
      name: "example condominium 1",
      email: "admin@example.com",
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

  it("should be able to create a new operator", async () => {
    const operatorsDTO: IRequest = {
      user_email: "admin@example.com",
      email: "example1@gmail.com",
    };
    const operator = await createOperatorUseCase.execute(operatorsDTO);
    expect(operator).toHaveProperty("email");
    expect(operator).toHaveProperty("condominium_id");
  });

  it("should  not be able create a new operator with an already used email", async () => {
    await expect(async () => {
      await createOperatorUseCase.execute({
        user_email: "admin@example.com",
        email: "example2@gmail.com",
      });
      await createOperatorUseCase.execute({
        user_email: "admin@example.com",
        email: "example2@gmail.com",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should  not be able create a new operator with an condominium not authenticated", async () => {
    await expect(async () => {
      await createOperatorUseCase.execute({
        user_email: "admsin@example.com",
        email: "example2@gmail.com",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
