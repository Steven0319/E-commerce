import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import App from "../App"; 
import About from "../pages/About";
import Contact from "../pages/Contact";
import Checkout from "../pages/CheckOut";
import CategoryProducts from "../pages/CategoryProducts"; 

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/products/:category" element={<CategoryProducts/>}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;