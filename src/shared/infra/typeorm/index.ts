import { Connection, createConnection, getConnectionOptions } from "typeorm";

async function connection(): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();

  const isTest = process.env.NODE_ENV === "test";

  return createConnection(
    Object.assign(defaultOptions, {
      database: isTest ? "rentx_test" : defaultOptions.database,
    })
  );
}

export { connection };
