export type userState = {
  currentUser: Ilogin,
  isAuth: boolean
  isLoading: boolean
}

export interface Ilogin {
  token: string;
  username: string;
  _id: string;
  avatar: string;
}

export interface IAuth {
    name: string;
    phone: string;
    city: string; 
    address: string;
    mail: string;
    password: string;
}


