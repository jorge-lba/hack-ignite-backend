import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { FirebaseAuthProvider } from "@shared/container/providers/AuthProvider/implementations/FirebaseAuthProvider";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  const authTokenProvider = container.resolve(FirebaseAuthProvider);

  const [, token] = authHeader.split("");

  try {
    const { firebase_id, email } = await authTokenProvider.verifyToken(token);

    request.user = {
      firebase_id,
      email,
    };

    next();
  } catch (error) {
    throw new Error("Invalid token!");
  }
}
