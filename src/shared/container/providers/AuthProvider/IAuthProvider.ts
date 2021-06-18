interface IUserDTO {
  email: string;
  uid: string;
}

interface IAuthProvider {
  verifyToken: (token: string) => Promise<IUserDTO>;
  deleteUser: (uid: string) => Promise<void>;
}

export { IAuthProvider };
