import { config } from "dotenv";
import admin from "firebase-admin";
import { inject, singleton } from "tsyringe";

import { IFirebaseAdmin } from "@shared/container/firebase/IFirebaseAdmin";

import { IAuthProvider } from "../IAuthProvider";

config();

interface IUserDTO {
  email: string;
  firebase_id: string;
}

@singleton()
class FirebaseAuthProvider implements IAuthProvider {
  constructor(
    @inject("FirebaseAdmin")
    private firebaseAdmin: IFirebaseAdmin
  ) {}

  private auth = this.firebaseAdmin.auth;

  async verifyToken(token: string): Promise<IUserDTO> {
    const { email, uid: firebase_id } = await this.auth.verifyIdToken(token);

    return {
      email,
      firebase_id,
    };
  }

  async deleteUser(firebase_id: string): Promise<void> {
    await this.auth.deleteUser(firebase_id);
  }
}

export { FirebaseAuthProvider };
