"use client"

import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { ActiveSectionContext } from '../context/ActiveSectionContext';
import { ThemeContext } from '../context/ThemeContext';

type SectionName = "hero" | "about" | "projects" | "contact";

const link = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
]

function Header() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)!;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const context = useContext(ActiveSectionContext);

    if (!context) {
        throw new Error("ActiveSectionContext is null. Make sure the provider is correctly set up.");
    }

    const { activeSection, setActiveSection } = context;

    const handleClick = (sectionId: string) => {
        const section = sectionId.substring(1) as SectionName;
        setActiveSection(section);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = link.map(item => item.href.substring(1));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    const elementTop = top + window.scrollY;
                    const elementBottom = bottom + window.scrollY;

                    if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
                        setActiveSection(section as SectionName);
                        break;
                    }

                    // Gestion spéciale pour la section hero en haut de page
                    if (window.scrollY < window.innerHeight / 2) {
                        setActiveSection("hero");
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Appel initial pour définir la section active au chargement
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'backdrop-blur-md bg-opacity-50' : ''
        } ${isDarkMode ? 'bg-[#0A0F0C]/80' : 'bg-[#E6F6EB]/80'} mb-14`}>
            <div className='flex items-center justify-between px-4 md:px-8 py-6 container mx-auto'>
                <h1 className='text-2xl md:text-3xl font-bold font-title text-primary w-24 md:w-40 -mt-1/2'>
                    ELYSÉ
                </h1>

                {/* Menu Hamburger pour mobile */}
                <div className='flex items-center space-x-4 md:hidden'>
                    <button 
                        className='cursor-pointer' 
                        onClick={toggleTheme}
                    >
                        <img 
                            src={isDarkMode ? "icons8-light-mode-100.png" : "icons8-night-mode-100.png"} 
                            alt={isDarkMode ? "Mode clair" : "Mode sombre"} 
                            className='w-8 h-8'
                        />
                    </button>
                    <button 
                        className='text-white z-50'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg 
                            className="w-8 h-8 transition-transform duration-300 ease-in-out" 
                            fill="none" 
                            stroke="#2B9A66" 
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1.5} 
                                    d="M6 18L18 6M6 6l12 12"
                                    className="transform rotate-0 transition-transform duration-300"
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1.5} 
                                    d="M4 6h16M4 12h16M4 18h16"
                                    className="transform rotate-0 transition-transform duration-300"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Navigation desktop */}
                <div className={`hidden md:flex items-center justify-center ${
                    isDarkMode ? 'bg-[#121B17]' : 'bg-white'
                } border-1 border-[#2B9A66] h-12 rounded-full shadow-lg px-12 mx-4`}>
                    <nav>
                        <ul className='flex space-x-10'>
                            {link.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleClick(item.href)}
                                        className={`${
                                            activeSection === item.href.substring(1)
                                                ? "text-green-500"
                                                : isDarkMode ? "text-white" : "text-gray-800"
                                        } font-semibold hover:text-green-500 transition-colors text-sm`}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className='fixed top-[4.5rem] right-0 w-[80%] max-w-sm h-auto bg-[#121B17] md:hidden rounded-l-2xl shadow-lg border-l border-t border-[#2B9A66]/20'>
                        <nav className='p-6'>
                            <ul className='flex flex-col space-y-6'>
                                {link.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleClick(item.href)}
                                            className={`${
                                                activeSection === item.href.substring(1)
                                                    ? "text-green-500 border-green-500"
                                                    : "text-gray-300 border-transparent"
                                            } flex items-center space-x-2 text-base font-medium hover:text-green-500 transition-colors py-2 px-4 border-l-2`}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                                <li className='pt-4 border-t border-[#2B9A66]/20'>
                                    <a 
                                        href="/CV.pdf" 
                                        download="CV_Elyse.pdf"
                                        className='bg-green-500/10 text-green-500 py-3 px-6 rounded-lg hover:bg-green-500/20 transition-colors font-medium w-full flex items-center justify-center'
                                    >
                                        Download CV
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
                

                {/* Bouton CV desktop */}
                <div className='hidden md:flex items-center space-x-4'>
                <button 
                    className='cursor-pointer' 
                    onClick={toggleTheme}
                >
                    <img 
                        src={isDarkMode ? "icons8-light-mode-100.png" : "icons8-night-mode-100.png"} 
                        alt={isDarkMode ? "Mode clair" : "Mode sombre"} 
                        className='w-10 h-10'
                    />
                </button>
                <a 
                    href="/CV.pdf" 
                    download="CV_Elyse.pdf"
                    className='hidden md:block w-40 bg- text-white py-2 rounded-md hover:bg-green-200 transition-colors font-semibold text-center cv'
                >
                    Download CV
                </a>
                </div>
            </div>
        </div>
    )
}

export default Header