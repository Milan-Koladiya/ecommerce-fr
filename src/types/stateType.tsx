import type { IUser } from "./userType";


export interface initialStateType{
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