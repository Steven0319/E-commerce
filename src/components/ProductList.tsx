import type { Product } from "../helpers/Interfaces";
import ProductCard from "./ProductCard";


interface ProductListProps {
  products: Product[];
}
const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))} 
      </div>
    </div>
  );
};

export default ProductList;