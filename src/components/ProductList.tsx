import type { Product } from "../App";
import ProductCard from "./ProductCard";

interface Rating {
  rate: number;
  count: number;
}

interface ProductListProps {
  products: Product[];
  rating: Rating;
}
const ProductList = ({ products, rating }: ProductListProps) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        My list of products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard product={product} rating={rating} />
        ))} 
      </div>
    </div>
  );
};

export default ProductList;