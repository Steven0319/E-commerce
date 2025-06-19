export interface rating {
  rate: number;
  count: number;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: rating;
  originalTitle?: string; 
}

export interface FetchState {
  data: Product[];
  loading: boolean;
  error: string | null;
}
