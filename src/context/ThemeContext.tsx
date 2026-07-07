import { createContext, useContext } from "react";

const ThemeContext = createContext<"light">("light");

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value="light">
      {children}
    </ThemeContext.Provider>
  );
}
