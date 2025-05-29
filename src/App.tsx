import {useState, useEffect, useRef, useMemo, useReducer} from 'react'
import './App.css'
import axios from 'axios';
import ProductList from './components/ProductList';
import { MdErrorOutline } from "react-icons/md";
import type { Product } from './helpers/Interfaces';
import type { FetchState } from './helpers/Interfaces';



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
  console.log("Dispatching", action.type); //para debugear
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
  const [searchTerm, setSearchTerm] = useState<string>(""); //estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null); //ref para el input

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      dispatch({ type: "FETCH_INIT" }); //Iniciar carga
      try {
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: response.data }); // Éxito
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Hubo un error";
        dispatch({ type: "FETCH_FAILURE", payload: message }); // Fallo
        console.log("error al consultar los productos");
      }
    };
    fetchProducts();
  }, []);

    useEffect(() => {
    searchInputRef.current?.focus();
  }, [state.loading]);

 const filteredProducts = useMemo(() => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return state.data.filter((item) =>
    item.title.toLowerCase().startsWith(lowerSearchTerm) ||
    item.category.toLowerCase().startsWith(lowerSearchTerm) ||
    item.description.toLowerCase().startsWith(lowerSearchTerm) ||
    item.price.toString().toLowerCase().startsWith(lowerSearchTerm) ||
    item.rating.rate.toString().toLowerCase().startsWith(lowerSearchTerm)
  );
}, [state.data, searchTerm]);

  if (state.loading) {
    return (
        <div className="flex flex-col justify-center">
          <h2>Loading....</h2>
          <div className="loader"></div>
        </div>
    );
  }

  if (state.error) {
    return (
      <p>
        <span className="text-red-500">
          <MdErrorOutline />
        </span>
        An error has ocurred...
        <span className="text-red-500">
          <MdErrorOutline />
        </span>
      </p>
    );
  }

 return (
  <div className="p-4">
    <h1 className="text-4xl font-bold text-center my-6 text-gray-800">
      My list of products
    </h1>

    <div className="mb-6 flex justify-center p-4 container mx-auto">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Type the name of product..."
        className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    <ProductList products={filteredProducts} rating={{ rate: 0, count: 0 }} />
  </div>
);
}

export default App;
