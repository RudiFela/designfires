import { createContext } from "react";
export const LanguageContext = createContext({
  language: "swedish",
  setLanguage: (lang) => {},
  isLoading: true,
  setIsLoading: (isLoading) => {},
  currencyPrice: () => {},
  currencySymbol: () => {},
});
