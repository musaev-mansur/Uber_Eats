export interface IFood {
  id: string;
  name: string;
  image: string;
  info: string;
  category: string;
  category_name: string;
  price: number;
  cafe: string;
  cafe_name: string;
  created_at: string;
}

export interface IFoodCategories {
  name: string;
  id: string;
}

export interface IGetOrders {
  id: string;
  foods: Array<{
    food: IFood;
    quantity: number;
  }>;
  cafe: string;
  cafe_name: string;
  client: string;
  client_name: string;
  total: string;
  from_time: string;
  to_time: string;
  status?: string;
  status_display?: string;
  created_at?: string;
}

export interface ISetOrder {
  foods: Array<{
    food_id: string;
    quantity: number;
  }>;
  cafe_id: string;
  client_id: string;
  total: number;
  from_time: string;
  to_time: string;
}
