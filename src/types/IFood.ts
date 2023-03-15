export type foodState = {
  food: IFood[];
  isAuth: boolean;
  isLoading: boolean;
};

export interface IFood {
  _id: string;
  name: string,
  image: string | File,
  mail: string, 
  phone: string,
  city: string,
  address: string,
  menu: string,
}

