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
