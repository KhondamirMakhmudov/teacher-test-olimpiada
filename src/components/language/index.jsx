import React, { useState, useEffect } from "react";
import { useSettingsStore } from "@/store";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import LangIcon from "../icons/lang";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const setLang = useSettingsStore((state) => get(state, "setLang", () => {}));

  const languages = [
    { code: "uz", name: "Uzbek" },
    { code: "ru", name: "Russian" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Declare isOpen
  const [isHydrated, setIsHydrated] = useState(false); // Ensure hydration is complete

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "uz";
      const initialLang =
        languages.find((lang) => lang.code === storedLang) || languages[0];

      setSelectedLanguage(initialLang);
      i18n.changeLanguage(initialLang.code); // Change i18n language
      setLang(initialLang.code); // Update global state

      setIsHydrated(true); // Hydration is complete
    }
  }, [i18n, setLang]); // Dependencies to re-run the effect if needed

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", language.code);
    }
    setLang(language.code);
    i18n.changeLanguage(language.code);
  };

  // Prevent rendering until hydration is complete
  if (!isHydrated || !selectedLanguage) return null;

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="bg-white hover:bg-[#d8d9db] dark:bg-[#26334A] p-2 rounded-full transform duration-200 active:scale-90 scale-100 flex items-center gap-x-[5px]"
      >
        <LangIcon color={"#5A6A85"} />
        <p className="uppercase text-sm text-black dark:text-white">
          {selectedLanguage?.code}
        </p>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 left-0 z-50 bg-white dark:bg-[#26334A] border border-gray-300 shadow-md">
          {languages
            .filter((language) => language.code !== selectedLanguage.code)
            .map((language) => (
              <button
                key={language.code}
                onClick={() => selectLanguage(language)}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 bg-white dark:bg-[#26334A] text-black dark:text-white"
              >
                <span className="text-sm ml-1 uppercase">{language.code}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
