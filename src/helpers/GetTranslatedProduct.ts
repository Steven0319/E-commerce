import ProductTranslations from "./ProductTranslations";
import type { Product } from "./Interfaces";
import i18n from "../i18n/i18n";

export function getTranslatedProduct(product: Product): Product {
  const cleanedTitle = product.title.trim();
  const translation = ProductTranslations[cleanedTitle];
  const lang = i18n.language;
  if (!translation || lang === "en") return product;

  const translated = translation[lang as "es" | "pt"];
  return {
    ...product,
    title: translated.title,
    description: translated.description,
  };
}