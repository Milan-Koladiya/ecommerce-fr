
export interface IUser {
    id?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string,
    role?: string,
    isVerified?: boolean
}


export interface resetPasswordType{
  token:object|string|null,
  newPassword:string
}