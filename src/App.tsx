import { useState, useEffect, useRef, useMemo, useReducer } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import SelectedProductList from "./components/SelectedProductList";
import { MdErrorOutline } from "react-icons/md";
import type { Product } from "./helpers/Interfaces";
import type { FetchState } from "./helpers/Interfaces";

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

function App() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        const message = error instanceof Error ? error.message : "An error occurred";
        dispatch({ type: "FETCH_FAILURE", payload: message });
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [state.loading]);

  const filteredProducts = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return state.data.filter(
      (item) =>
        item.title.toLowerCase().startsWith(lowerSearchTerm) ||
        item.category.toLowerCase().startsWith(lowerSearchTerm) ||
        item.description.toLowerCase().startsWith(lowerSearchTerm) ||
        item.price.toString().startsWith(lowerSearchTerm) ||
        item.rating.rate.toString().startsWith(lowerSearchTerm)
    );
  }, [state.data, searchTerm]);

  if (state.loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
        <h2 className="text-xl font-semibold mb-4">Loading....</h2>
        <div className="loader"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <p className="flex items-center text-red-500 text-lg">
          <MdErrorOutline className="mr-2" />
          {state.error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Sección principal */}
      <div className="w-3/4 p-4 overflow-y-auto">
        {/* Logo animado */}
        <div className="flex justify-center my-10">
          <h1
            className="
              text-6xl font-extrabold bg-gradient-to-r from-cyan-500 to-teal-400 
              bg-clip-text text-transparent animate-glow hover:scale-105 select-none cursor-default transition-transform
            "
          >
            MyShop.com
          </h1>
        </div>

        {/* Buscador */}
        <div className="mb-6 flex justify-center p-4 container mx-auto">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Type the name of product..."
            className="w-full max-w-lg p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-black dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista de productos */}
        <ProductList products={filteredProducts} />
      </div>

      {/* Sección lateral */}
      <div className="w-1/4 bg-gray-50 dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700 transition-colors">
        <SelectedProductList />
      </div>
    </div>
  );
}

export default App;