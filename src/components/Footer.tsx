import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const flags = {
  en: "https://flagcdn.com/w40/us.png",
  es: "https://flagcdn.com/w40/es.png",
  pt: "https://flagcdn.com/w40/pt.png",
};

const Footer = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {/* Logo + Banderas */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
              MS
            </div>
            <h3 className="text-lg font-semibold text-gray-300">MyShop.com</h3>
          </div>

          {/* ✅ Banderas mejoradas */}
          <div className="flex space-x-2 mt-2">
            {Object.entries(flags).map(([lng, src]) => (
              <button
                key={lng}
                onClick={() => changeLanguage(lng)}
                className={`p-[2px] rounded-full transition ${
                  i18n.language === lng ? "ring-2 ring-cyan-400" : ""
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
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li>Heredia, Costa Rica</li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Contact</h3>
          <p className="text-sm text-gray-400">
            Email:{" "}
            <a href="mailto:harold665.hscg@gmail.com" className="hover:underline">
              harold665.hscg@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-400">Teléfono: +506 8888 8888</p>
        </div>

        {/* CEO */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-300">CEO</h3>
          <p className="text-sm text-gray-400">Harold Steven C.G</p>
          <p className="text-sm text-gray-400">
            Email:{" "}
            <a href="mailto:harold665.hscg@gmail.com" className="hover:underline">
              harold665.hscg@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-400">
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/harold-steven-cabrera-gonzalez-b02179206/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              /Harold Steven C.G
            </a>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full flex justify-center items-center text-sm text-gray-400 mt-6">
        <p>© {new Date().getFullYear()} Shop.com | Developed by Harold Steven C.G</p>
      </div>
    </footer>
  );
};

export default Footer;