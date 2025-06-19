import { useLanguage } from "../context/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "es", label: "ES", flag: "🇪🇸" },
    { code: "pt", label: "PT", flag: "🇵🇹" },
  ];

  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as "en" | "es" | "pt")}
          className={`px-2 py-1 rounded ${
            language === lang.code ? "bg-cyan-500 text-white" : "bg-white text-cyan-700"
          }`}
        >
          <span className="mr-1">{lang.flag}</span> {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;