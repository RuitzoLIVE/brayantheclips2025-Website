import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full transition-all duration-300 hover:bg-secondary"
      title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      {theme === "light" ? (
        <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400 transition-transform duration-300" />
      )}
    </Button>
  );
}
