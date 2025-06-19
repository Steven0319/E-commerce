import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
  useTheme(); 

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1 p-4 transition-colors duration-300">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;