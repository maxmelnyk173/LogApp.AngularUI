export interface User{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  position: string
}

export interface RegisterUser{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: string,
  position: string
}

export interface CurrentUser{
  id: string,
  firstName: string,
  lastName: string,
  position: string
}
