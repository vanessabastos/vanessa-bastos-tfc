export interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
}

export default interface ILogin {
  email: string,
  password: string,
}
