import { useParams } from "react-router-dom";
import { useReducer, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProductList from "../components/ProductList";
import type { Product, FetchState } from "../helpers/Interfaces";

const initialState: FetchState = {
  data: [],
  loading: true,
  error: null,
};

type FetchAction =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: Product[] }
  | { type: "FETCH_FAILURE"; payload: string };

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const apiCategoryMap: Record<string, string> = {
  "mens-clothing": "men's clothing",
  jewelery: "jewelery",
  electronics: "electronics",
};

const CategoryProducts = () => {
  const { category } = useParams();
  const { t } = useTranslation();

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const apiCategory = apiCategoryMap[category || ""] || category;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await axios.get<Product[]>(
          `https://fakestoreapi.com/products/category/${apiCategory}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        const message = error instanceof Error ? error.message : "An error occurred";
        dispatch({ type: "FETCH_FAILURE", payload: message });
      }
    };

    fetchCategoryProducts();
  }, [apiCategory]);

  if (state.loading) return <p className="text-center mt-10">{t("loading_category")}</p>;
  if (state.error) return <p className="text-center text-red-500 mt-10">{state.error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {t(category || "") || category}
      </h1>
      <ProductList products={state.data} />
    </div>
  );
};

export default CategoryProducts;