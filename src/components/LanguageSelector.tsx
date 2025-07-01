import React, { useState, useRef, useEffect } from 'react';

interface Language {
  code: string;
  label: string;
  flag: string;
}

interface Props {
  languages: Language[];
}

const LanguageSelector: React.FC<Props> = ({ languages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative hidden md:inline-block text-left w-36">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-400 rounded-lg bg-transparent shadow-sm"
      >
        <div className="flex items-center space-x-2">
          <img src={language.flag} alt={language.code} className="w-5 h-5 rounded-full" />
          <span className="text-sm dark:text-white">{language.label}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
            >
              <img src={lang.flag} alt={lang.code} className="w-5 h-5 rounded-full" />
              <span className="text-sm dark:text-white">{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
