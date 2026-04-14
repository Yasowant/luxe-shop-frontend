export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  quantity: number;
}
