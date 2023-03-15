export interface IFood {
  _id: string;
  name: string,
  image: string,
  mail: string, 
  phone: number,
  city: string,
  address: string,
  menu: string,
}

export type foodState = {
  food: IFood[];
  isAuth: boolean;
  isLoading: boolean;
};
