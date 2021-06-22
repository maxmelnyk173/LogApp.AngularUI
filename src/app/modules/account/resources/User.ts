export interface User{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    position: string
}

export interface AddUser{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
    position: string
}

export interface UpdateUser{
    firstName: string,
    lastName: string,
    position: string
}

export interface ChangePassword{
    password: string,
    confirmPassword: string,
}