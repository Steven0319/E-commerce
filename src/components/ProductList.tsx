import { useTranslation } from "react-i18next";
import type { Product } from "../helpers/Interfaces";
import ProductCard from "./ProductCard";
import productTranslations from "../helpers/ProductTranslations";
import { useLanguage } from "../context/LanguageContext";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const getTranslatedProduct = (product: Product): Product => {
    const cleanedTitle = product.title.trim();
    const translation = productTranslations[cleanedTitle];
    const normalizedLang =
      language.startsWith("es") ? "es" :
      language.startsWith("pt") ? "pt" : "en";


    if (!translation || normalizedLang === "en") {
      return product;
    }

    return {
      ...product,
      title: translation[normalizedLang].title,
      description: translation[normalizedLang].description,
    };
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-center mb-6">
       <h2 className="relative inline-block text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">
        <span className="relative z-10">{t("product_list_title")}</span>
        <span className="absolute left-0 bottom-1 w-full h-2 bg-yellow-300 dark:bg-yellow-600 opacity-50 rounded -z-0"></span>
       </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={getTranslatedProduct(product)} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;