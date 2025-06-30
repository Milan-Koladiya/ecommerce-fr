import type { IUser } from "./user.type";


export interface InitialStateType{
    loading?: string|boolean;
    message?: any;
    error?: boolean|null|unknown;
    apiName?: string;
    alertType?: string;
    emailStatus?: string;
    verifyResetToken?: null;
    success?:boolean|null,
    profile?:IUser,
    users?:IUser
}