import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-yellow-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-6 h-6 text-gray-800 transition-transform duration-300 rotate-0 hover:-rotate-90" />
      )}
    </button>
  );
};

export default DarkModeToggle;