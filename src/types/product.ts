export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  category: string;
  isActive: boolean;
  rating: number;
  numReviews: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
