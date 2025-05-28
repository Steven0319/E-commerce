import type { Product } from "../App";

interface Rating {
  rate: number;
  count: number;
}

interface ProductCardProps {
  product: Product;
  rating: Rating;
}

const ProductsCard = ({ product, rating }: ProductCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-xl bg-gray-200 h-full flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain rounded-lg mb-4"
      />
     <h2 className="text-xl font-semibold text-blue-900 hover:underline">{product.title}</h2>
     <p>
      <strong>Rating:</strong> {rating.rate} ({rating.count} reviews)
     </p>
      <p className="text-gray-600">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="text-gray-800">
        <strong>Price:</strong> ${product.price}
      </p>
     <p className="text-gray-700 text-left text-sm">
        <strong>Description:</strong> {product.description}
      </p>
    </div>
  );
}

export default ProductsCard