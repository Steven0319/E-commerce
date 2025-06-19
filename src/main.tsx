import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/AppRoutes.tsx";
import "./i18n/i18n.ts";
import "./index.css";
import { SelectedProductsProvider } from "./context/SelectedProductsContext.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <ThemeProvider>
     <PayPalScriptProvider options={{ clientId: "Ae4tapXdMHyxEt-rPzjXpxQThz8PZ-v7nt1HbU2kdz36xe4dgtgrZ1OJrI9ccFIIWddRlc85h_-1FvPk", currency: "USD" }}>
      <BrowserRouter>
        <LanguageProvider>
        <SelectedProductsProvider>
          <AppRoutes />
        </SelectedProductsProvider>
        </LanguageProvider>
      </BrowserRouter>
    </PayPalScriptProvider>
      </ThemeProvider>
  </StrictMode>
);