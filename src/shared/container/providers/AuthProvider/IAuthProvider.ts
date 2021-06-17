interface IAuthProvider {
  verifyToken:(token: string) => Promise<any>
}

export { IAuthProvider }