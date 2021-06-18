import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOperators1623898706308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "operators",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "firebase_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "condominium_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FkOperators",
            referencedTableName: "condominiums",
            referencedColumnNames: ["id"],
            columnNames: ["condominium_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("operators");
  }
}
