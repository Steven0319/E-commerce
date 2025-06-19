import { createContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../helpers/Interfaces";

export interface SelectedProductEntry {
  product: Product;
  count: number;
}

interface State {
  selectedProducts: SelectedProductEntry[];
}

type Action =
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "REMOVE_PRODUCT"; payload: number }
  | { type: "CLEAR_ALL" }
  | { type: "LOAD_FROM_STORAGE"; payload: SelectedProductEntry[] };

const initialState: State = {
  selectedProducts: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const existing = state.selectedProducts.find(p => p.product.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          selectedProducts: state.selectedProducts.map(p =>
            p.product.id === action.payload.id
              ? { ...p, count: p.count + 1 }
              : p
          ),
        };
      }
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, { product: action.payload, count: 1 }],
      };
    }
    case "REMOVE_PRODUCT":
      return {
        ...state,
        selectedProducts: state.selectedProducts.filter(p => p.product.id !== action.payload),
      };
    case "CLEAR_ALL":
      return { ...state, selectedProducts: [] };
    case "LOAD_FROM_STORAGE":
      return { ...state, selectedProducts: action.payload };
    default:
      return state;
  }
};

export const SelectedProductsContext = createContext<{
  selectedProducts: SelectedProductEntry[];
  addSelectedProduct: (product: Product) => void;
  removeSelectedProduct: (productId: number) => void;
  clearAllSelections: () => void;
} | null>(null);

export const SelectedProductsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("selectedProducts");
    if (stored) {
      dispatch({ type: "LOAD_FROM_STORAGE", payload: JSON.parse(stored) });
    }
  }, []);

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));
  }, [state.selectedProducts]);

  const addSelectedProduct = (product: Product) => dispatch({ type: "ADD_PRODUCT", payload: product });
  const removeSelectedProduct = (productId: number) => dispatch({ type: "REMOVE_PRODUCT", payload: productId });
  const clearAllSelections = () => dispatch({ type: "CLEAR_ALL" });

  return (
    <SelectedProductsContext.Provider
      value={{
        selectedProducts: state.selectedProducts,
        addSelectedProduct,
        removeSelectedProduct,
        clearAllSelections,
      }}
    >
      {children}
    </SelectedProductsContext.Provider>
  );
};