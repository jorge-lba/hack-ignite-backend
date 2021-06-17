import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJointOwners1623898731185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "jointOwners",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "road",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "block",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "number",
            type: "decimal",
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
            name: "FkJointOwners",
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
    await queryRunner.dropTable("jointOwners");
  }
}
