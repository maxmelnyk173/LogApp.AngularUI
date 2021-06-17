import { User } from "./User";

export interface AuthData{
    token: string | null,
    expiredAt: Date | null,
    user: User
}