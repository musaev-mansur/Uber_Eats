export type userState = {
  currentUser: Ilogin;
  isAuth: boolean;
  isLoading: boolean;
};

export interface Ilogin {
  token: string;
  id: string;
  role: string;
}

export interface ISignUp {
  name: string;
  phone: string;
  city: string;
  address: string;
  mail: string;
  password: string;
}

export interface ILogIn {
  mail: string;
  password: string;
}

export interface IProfileUserData 
{
  _id: string;
  name: string
  phone: string
  city: string
  address: string
  mail: string
  password: string
  role: string
  __v: number
}