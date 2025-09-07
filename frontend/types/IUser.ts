import { IFood } from "./IFood";

export type userState = {
  currentUser: IUserData;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
};

export interface IUserData {
  token: string;
  id: string;
  role: string;
}

export interface ISignUp {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  role: string;
  phone: string;
  city: string;
  address: string;
  image?: FileList;
}

export interface ILogIn {
  email: string;
  password: string;
}

export interface IProfileUserData {
  id: string;
  username: string
  image: string
  phone: string
  city: string
  address: string
  email: string
  menu?: IFood[]
  role: string
}

export interface IUserEdit {
  id: string;
  username: string,
  image: string,
  email: string, 
  phone: string,
  city: string,
  address: string,
  menu: [],
}
