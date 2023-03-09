export type userState = {
  currentUser: Ilogin,
  isAuth: boolean
  isLoading: boolean
}

export interface Ilogin {
  token: string;
  id: string;
  role: string;
}

export interface IAuth {
    name: string;
    phone: string;
    city: string; 
    address: string;
    mail: string;
    password: string;
}


