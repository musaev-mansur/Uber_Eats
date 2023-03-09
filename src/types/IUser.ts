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



