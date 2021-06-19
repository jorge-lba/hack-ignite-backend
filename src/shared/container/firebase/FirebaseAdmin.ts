import { config } from "dotenv";
import admin from "firebase-admin";
import { singleton } from "tsyringe";

import { IFirebaseAdmin } from "./IFirebaseAdmin";

config();

@singleton()
class FirebaseAdmin implements IFirebaseAdmin {
  private CREDENTIAL_PATH = process.env.CREDENTIAL_PATH;

  private app: admin.app.App;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(this.CREDENTIAL_PATH),
    });
  }

  get auth(): admin.auth.Auth {
    return admin.auth(this.app);
  }
}

export { FirebaseAdmin };
