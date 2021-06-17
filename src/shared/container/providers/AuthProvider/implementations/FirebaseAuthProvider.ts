import admin from "firebase-admin"

import credential from "../../../../../../alfred-ignite-firebase-admin.json"

import { IAuthProvider } from "../IAuthProvider";

interface IUserDTO {
  email: string
  uid: string
}

class FirebaseAuthProvider implements IAuthProvider {

  async verifyToken(token: string): Promise<IUserDTO>{
    const app = admin.initializeApp({
      credential: admin.credential.cert(`${credential}`)
    })

    const {
      email,
      uid
    } = await app.auth().verifyIdToken(token)

    return {
      email,
      uid
    }
  }
}
 export { FirebaseAuthProvider }