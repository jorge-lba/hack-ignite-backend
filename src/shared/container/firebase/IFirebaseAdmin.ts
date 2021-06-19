import { auth, firestore } from "firebase-admin";

interface IFirebaseAdmin {
  auth: auth.Auth;
  firestore: firestore.Firestore;
}

export { IFirebaseAdmin };
