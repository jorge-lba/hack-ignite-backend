interface IAuthProvider {
  verifyToken:<T>() => Promise<T>
}

export { IAuthProvider }