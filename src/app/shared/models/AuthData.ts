import { DataSource } from "@angular/cdk/collections";
import { User } from "./User";

export interface AuthData{
    token: string,
    exp: number,
    user: User
}