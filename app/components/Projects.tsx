"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Projects() {
    const sectionRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext)!;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Met à jour l'URL uniquement si la section est visible
                    window.history.replaceState({}, '', '#projects');
                }
            },
            {
                threshold: 0.5 // Déclenche quand 50% de la section est visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const projects = [
        {names:"Restaurant Management", images:"1.JPG",description:"This project is a project that manages customer orders and reservations", stack:["HTML","CSS","JS","PHP","MYSQL","BOOTSTRAP"] ,project:"#projects",code:"https://github.com/ElyseRaz/Gestion-Restaurant" },
        {names:"Pot au Feu", images:"Pot.JPG",description:"This project is a showcase site for a caterer made with Next JS", stack:["REACT JS","NEXT JS","TAILWINDCSS"],project:"https://pot-au-feu-beta.vercel.app/" ,code:"https://github.com/ElyseRaz/pot-au-feu"},
        {names:"Portfolio", images:"portfolio.png",description:"This project is a portfolio site that showcases my work and skills", stack:["REACT JS","NEXT JS","TAILWINDCSS"],project:"#hero" ,code:"https://github.com/ElyseRaz/Portfolio"},
    ]
  return (
        <section 
            ref={sectionRef}
            id="projects" 
            className={`flex flex-col items-center min-h-screen ${
                isDarkMode ? 'bg-[#121B17] text-white' : 'bg-[#E6F6EB] text-black'
            } scroll-mt-20 px-4 py-16 -mt-10`} // Remplacé pt-24 par py-16 pour un espacement plus équilibré
        >
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-3xl md:text-5xl font-bold mb-5 text-center'
                style={{
                    color: '#2B9A66',     
                    paddingBottom: '10px' // Ajout d'un padding en bas
                }}
            >
            PROJECTS
            </motion.h1>
            <h2 className='text-white mb-5 font-semibold'>Here are the 3 projects I selected</h2>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='container mx-auto px-4 lg:px-8'
            >
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {projects.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            className={`flex flex-col items-center ${
                                isDarkMode ? 'bg-[#121B17] text-white' : 'bg-[#E6F6EB] text-black'
                            } p-6 rounded-xl shadow-xl transition-all duration-300 border-2 border-[#2B9A66] relative overflow-hidden group`}
                        >
                            <div className='w-full flex justify-center mb-6'>
                                <img 
                                    src={item.images} 
                                    alt={item.names} 
                                    className='w-44 border-1 border-[#2B9A66] h-24 object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300' 
                                />
                            </div>
                            
                            <h2 className={`text-2xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {item.names}
                            </h2>
                            
                            <p className={`text-center leading-relaxed mb-6 text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {item.description}
                            </p>
                            
                            <div className='flex flex-wrap justify-center gap-2 mb-6'>
                                {item.stack.map((stackItem, stackIndex) => (
                                    <span 
                                        key={stackIndex} 
                                        className={`bg-[#2B9A66]/20 ${
                                            isDarkMode ? 'text-[#2B9A66]' : 'text-[#2B9A66]'
                                        } text-sm font-medium px-3 py-1 rounded-full border border-[#2B9A66]/30`}
                                    >
                                        {stackItem}
                                    </span>
                                ))}
                            </div>
                            <div className='flex flex-row gap-4 w-full items-center justify-center mt-auto'>
                                <a
                                    href={item.project}
                                    className={`${
                                        isDarkMode
                                            ? 'bg-[#2B9A66] text-gray-100 hover:bg-[#FFF] hover:text-black'
                                            : 'bg-[#2B9A66] text-gray-100 hover:bg-[#121B17] hover:text-white'
                                    } font-medium px-4 py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#2B9A66]/20 w-1/3 max-w-[130px] text-sm`}
                                    onClick={(e) => {
                                        if (item.project.startsWith('#')) {
                                            e.preventDefault();
                                            document.querySelector(item.project)?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    <span className='whitespace-nowrap'>View Project</span>
                                    <svg 
                                        className="w-3.5 h-3.5 inline-block" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                                <a
                                    href={item.code}
                                    className={`${
                                        isDarkMode
                                            ? 'bg-transparent border-2 border-[#2B9A66] text-[#2B9A66] hover:bg-[#FFF] hover:text-black'
                                            : 'bg-transparent border-2 border-[#2B9A66] text-[#2B9A66] hover:bg-[#121B17] hover:text-white'
                                    } font-medium px-4 py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-2 w-1/3 max-w-[130px] text-sm`}
                                >
                                    <span className='whitespace-nowrap'>View Code</span>
                                    <svg 
                                        className="w-3.5 h-3.5 inline-block" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            
        </section>
  )
}

export default Projects