import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import { container } from "tsyringe";

import { FirebaseAuthProvider } from "@shared/container/providers/AuthProvider/implementations/FirebaseAuthProvider";
import { AppError } from "@shared/errors/AppError";

const isTest = process.env.NODE_ENV === "test";

interface IHeadersTest extends IncomingHttpHeaders {
  firebase_id: string;
  email: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  if (isTest) {
    const { email, firebase_id } = request.headers as IHeadersTest;

    request.user = {
      firebase_id,
      email,
    };

    next();

    return;
  }

  const authHeader = request.headers.authorization;
  const authTokenProvider = container.resolve(FirebaseAuthProvider);

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split("");

  try {
    const { firebase_id, email } = await authTokenProvider.verifyToken(token);

    request.user = {
      firebase_id,
      email,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
