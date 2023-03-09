export interface IFood {
  _id: string;
  name: string;
  image: string;
  info: string;
  categoryId: string;
  price: number;
  cafeId: string;
  __v: number;
  
  }
  
  export type foodState = {
    food: IFood[];
  }
  