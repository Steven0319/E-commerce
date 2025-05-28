import {useState, useEffect, useRef, useMemo} from 'react'
import './App.css'
import axios from 'axios';
import ProductList from './components/ProductList';
import { MdErrorOutline } from "react-icons/md";

export interface rating {
  rate: number;
  count: number;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: rating;
}
function App() {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); //estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null); //ref para el input

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        setProduct(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("an error occurred");
        }
        console.log("an error occurred");
      }finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

    useEffect(() => {
    searchInputRef.current?.focus();
  }, [loading]);

 const filteredProducts = useMemo(() => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return product.filter((item) =>
    item.title.toLowerCase().startsWith(lowerSearchTerm) ||
    item.category.toLowerCase().startsWith(lowerSearchTerm) ||
    item.description.toLowerCase().startsWith(lowerSearchTerm) ||
    item.price.toString().toLowerCase().startsWith(lowerSearchTerm) ||
    item.rating.rate.toString().toLowerCase().startsWith(lowerSearchTerm)
  );
}, [product, searchTerm]);

  if (loading) {
    return (
        <div className="flex flex-col justify-center">
          <h2>Loading....</h2>
          <div className="loader"></div>
        </div>
    );
  }

  if (error) {
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
