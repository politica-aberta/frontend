"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("", className)}>
      <Button
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        variant="ghost"
      >
        <Moon className="block dark:hidden " />
        <Sun className="hidden dark:block" />
        <span className="sr-only">Toggle Theme</span>
      </Button>
    </div>
  );
}
