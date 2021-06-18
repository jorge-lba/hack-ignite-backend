interface IUserDTO {
  email: string;
  firebase_id: string;
}

interface IAuthProvider {
  verifyToken: (token: string) => Promise<IUserDTO>;
  deleteUser: (firebase_id: string) => Promise<void>;
}

export { IAuthProvider };
