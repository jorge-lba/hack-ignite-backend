interface IAuthProvider {
  verifyToken:(token: string) => Promise<any>
  delete:(uid: string) => Promise<any>
}

export { IAuthProvider }