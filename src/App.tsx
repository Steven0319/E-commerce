import {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios';
import ProductList from './components/Productlist';
import { MdErrorOutline } from "react-icons/md";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export interface rating {
  rate: number;
  count: number;
}
function App() {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false);
          setError(error.message);
        } else {
          setLoading(false);
          setError("an error occurred");
        }
        console.log("an error occurred");
      }
    };
    fetchUsers();
  }, []);


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
    <>
      <ProductList products={product} rating={{ rate: 0, count: 0 }} />
    </>
  );
}

export default App;
