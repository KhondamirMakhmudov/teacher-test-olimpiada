"use client";

import { useTheme } from "next-themes";
import { MoonIcon } from "../icons/moon";
import { SunIcon } from "../icons/sun";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      <motion.button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: theme === "light" ? -10 : 10 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="p-2  "
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </motion.button>
    </div>
  );
};

export default ThemeChanger;
