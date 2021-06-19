import { auth } from "firebase-admin";

interface IFirebaseAdmin {
  auth: auth.Auth;
}

export { IFirebaseAdmin };
