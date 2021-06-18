import { v4 as uuid } from "uuid";

import { connection } from "..";

async function create() {
  const db = await connection();

  const id = uuid();

  await db.query(
    `INSERT INTO CONDOMINIUMS(id, name, email, cnpj, firebase_id, created_at, updated_at)
    values('${id}', 'cd. Alfred', 'adm@condominio.com', 'null', 'SWnHY1GcVeOWUEQOVaf91zUQ45L2', 'now()', 'now()')`
  );

  await db.close();
}

create().then(() => console.log("Condominium created!"));
