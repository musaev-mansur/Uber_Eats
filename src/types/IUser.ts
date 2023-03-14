export type userState = {
  currentUser: IUserData;
  isAuth: boolean;
  isLoading: boolean;
};

export interface IUserData {
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
  image: string
  phone: string
  city: string
  address: string
  mail: string
  password: string
  role: string
  __v: number
}