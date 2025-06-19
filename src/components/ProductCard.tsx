import { useTranslation } from "react-i18next";
import { useContext } from "react";
import type { Product } from "../helpers/Interfaces";
import { SelectedProductsContext } from "../context/SelectedProductsContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
  const context = useContext(SelectedProductsContext);

  if (!context) {
    throw new Error("ProductCard debe estar dentro de un SelectedProductsProvider");
  }

  const { addSelectedProduct } = context;

  return (
    <div className="border p-4 rounded-lg shadow-xl bg-gray-100 h-full flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-blue-900 hover:underline mb-1">
        {product.title}
      </h2>
      <p className="text-gray-700 text-sm mb-1">
        <strong>{t("category")}:</strong> {product.category}
      </p>
      <p className="text-gray-900 font-bold mb-2">
        <strong>{t("price")}:</strong> ${product.price}
      </p>
      <p className="text-gray-700 text-sm mb-3">{product.description.slice(0, 100)}...</p>
      {product.rating && (
        <p className="text-sm text-gray-600 mb-3">
          ⭐ <strong>{product.rating.rate}</strong> ({product.rating.count} {t("reviews")})
        </p>
      )}
      <button
        onClick={() => addSelectedProduct(product)}
        className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {t("add_to_cart")}
      </button>
    </div>
  );
};

export default ProductCard;