"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(true); // Valeur par défaut côté serveur

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Charger le thème depuis localStorage
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setIsDarkMode(savedTheme === 'dark');
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Appliquer les classes appropriées au body
            document.body.className = isDarkMode 
                ? 'bg-[#0A0F0C] text-white' 
                : 'bg-white text-black';

            // Enregistrer le thème dans localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}