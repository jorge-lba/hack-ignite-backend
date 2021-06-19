import { config } from "dotenv";
import admin from "firebase-admin";
import { singleton } from "tsyringe";

import { IFirebaseAdmin } from "./IFirebaseAdmin";

config();

@singleton()
class FirebaseAdmin implements IFirebaseAdmin {
  private CREDENTIAL_PATH = process.env.CREDENTIAL_PATH;

  private admin = admin;
  private app: admin.app.App;

  constructor() {
    this.app = this.admin.initializeApp({
      credential: this.admin.credential.cert(this.CREDENTIAL_PATH),
    });
  }

  get auth(): admin.auth.Auth {
    return this.admin.auth(this.app);
  }

  get firestore(): admin.firestore.Firestore {
    return this.admin.firestore(this.app);
  }
}

export { FirebaseAdmin };
