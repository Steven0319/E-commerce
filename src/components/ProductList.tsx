import type { Product } from "../helpers/Interfaces";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id}product={product} rating={rating} />
        ))} 
      </div>
    </div>
  );
};

export default ProductList;