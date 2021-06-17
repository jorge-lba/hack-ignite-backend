import { config } from "dotenv";
import admin from "firebase-admin";

import { IAuthProvider } from "../IAuthProvider";

config();

interface IUserDTO {
  email: string;
  uid: string;
}

class FirebaseAuthProvider implements IAuthProvider {
  private CREDENTIAL_PATH = process.env.CREDENTIAL_PATH;

  private app: admin.app.App;
  private auth: admin.auth.Auth;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(this.CREDENTIAL_PATH),
    });

    this.auth = admin.auth(this.app);
  }

  async verifyToken(token: string): Promise<IUserDTO> {
    const { email, uid } = await this.auth.verifyIdToken(token);

    return {
      email,
      uid,
    };
  }

  async deleteUser(uid: string): Promise<void> {
    await this.auth.deleteUser(uid);
  }
}

export { FirebaseAuthProvider };
