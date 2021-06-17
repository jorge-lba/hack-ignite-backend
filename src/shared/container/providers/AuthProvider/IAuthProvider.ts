interface IAuthProvider {
  verifyToken:(token: string) => Promise<any>
  deleteUser:(uid: string) => Promise<any>
}

export { IAuthProvider }