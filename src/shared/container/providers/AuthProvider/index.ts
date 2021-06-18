import { container } from "tsyringe";

import { IAuthProvider } from "./IAuthProvider";
import { FirebaseAuthProvider } from "./implementations/FirebaseAuthProvider";

container.registerSingleton<IAuthProvider>(
  "FirebaseAuthProvider",
  FirebaseAuthProvider
);
