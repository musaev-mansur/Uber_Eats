export interface IFood {
  _id: string;
  name: string;
  image: string;
  info: string;
  categoryId: string;
  price: number;
  cafeId: string;
}

export interface IFoodCategories {
  name: string;
  _id: string;
}

export interface IGetOrders {
  _id: string;
  foods: string[];
  cafeId: string;
  clientId: string;
  total: 150;
  from: string;
  to: string;
}

export interface ISetOrder {
  foods: string[];
  cafeId: string;
  clientId: string;
  total: number;
  from: string;
  to: string;
}
