import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const categories = [
  { name: "Clothes", path: "/products/mens-clothing" },
  { name: "Accessories", path: "/products/jewelery" },
  { name: "Technology", path: "/products/electronics" },
];

const flags = {
  en: "https://flagcdn.com/w40/us.png",
  es: "https://flagcdn.com/w40/es.png",
  pt: "https://flagcdn.com/w40/pt.png",
};

const Navbar = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    setLanguage(lng as "en" | "es" | "pt");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-cyan-600 dark:bg-cyan-800 text-white shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-cyan-300 transition">
          MyShop
        </Link>

        <div className="flex items-center space-x-6 relative">
          <Link to="/" className="hover:text-cyan-300 transition">{t("home")}</Link>

          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center hover:text-cyan-300 transition"
            aria-expanded={open}
          >
            {t("products")}
            <ChevronDown
              className={`w-5 h-5 ml-1 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {open && (
            <div
              ref={menuRef}
              className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded shadow-lg z-50 transition-colors duration-300"
            >
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="block px-4 py-2 text-sm hover:bg-cyan-100 dark:hover:bg-cyan-900 hover:text-cyan-800 dark:hover:text-cyan-300"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          <Link to="/about" className="hover:text-cyan-300 transition">{t("about")}</Link>
          <Link to="/contact" className="hover:text-cyan-300 transition">{t("contact")}</Link>

          {/*Language Selector*/}
          <div className="flex gap-2 items-center ml-4">
            {Object.entries(flags).map(([lng, src]) => (
              <button
                key={lng}
                onClick={() => changeLanguage(lng)}
                className={`p-[2px] rounded-full transition ${
                  language === lng ? "ring-2 ring-cyan-400" : ""
                }`}
                aria-label={`Change language to ${lng}`}
              >
                <img
                  src={src}
                  alt={lng}
                  className="w-6 h-4 object-cover rounded"
                />
              </button>
            ))}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-1 rounded hover:bg-cyan-700 dark:hover:bg-cyan-900 transition"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-white/80" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;