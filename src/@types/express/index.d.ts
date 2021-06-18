declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      firebase_id: string;
      email: string;
    };
  }
}
