import { createContext, useState } from "react";
import type { Product } from "../helpers/Interfaces";

export interface SelectedProductEntry {
  product: Product;
  count: number;
}

interface SelectedProductsContextType {
  selectedProducts: SelectedProductEntry[];
  addSelectedProduct: (product: Product) => void;
  removeSelectedProduct: (productId: number) => void;
  clearProductSelections: (productId: number) => void;
}

export const SelectedProductsContext = createContext<
  SelectedProductsContextType | undefined
>(undefined);

export function SelectedProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProductEntry[]
  >([]);

  const addSelectedProduct = (productToAdd: Product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProductEntry = prevSelectedProducts.find(
        (entry) => entry.product.id === productToAdd.id
      );

      if (existingProductEntry) {
        return prevSelectedProducts.map((entry) =>
          entry.product.id === productToAdd.id
            ? { ...entry, count: entry.count + 1 }
            : entry
        );
      } else {
        return [...prevSelectedProducts, { product: productToAdd, count: 1 }];
      }
    });
  };

  const removeSelectedProduct = (productIdToRemove: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProductEntry = prevSelectedProducts.find(
        (entry) => entry.product.id === productIdToRemove
      );

      if (!existingProductEntry) return prevSelectedProducts;

      if (existingProductEntry.count > 1) {
        return prevSelectedProducts.map((entry) =>
          entry.product.id === productIdToRemove
            ? { ...entry, count: entry.count - 1 }
            : entry
        );
      } else {
        return prevSelectedProducts.filter(
          (entry) => entry.product.id !== productIdToRemove
        );
      }
    });
  };

  const clearProductSelections = (productIdToClear: number) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter(
        (entry) => entry.product.id !== productIdToClear
      )
    );
  };

  const value = {
    selectedProducts,
    addSelectedProduct,
    removeSelectedProduct,
    clearProductSelections,
  };

  return (
    <SelectedProductsContext.Provider value={value}>
      {children}
    </SelectedProductsContext.Provider>
  );
}
