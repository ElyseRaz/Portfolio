"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActiveSectionContext } from '../context/ActiveSectionContext';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';

function About() {
    const { isDarkMode } = useContext(ThemeContext)!;
    const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu hamburger

    const data = [
        { image: "icons8-ux-100.png", title: "UX/UI Design", description: "I make website mockups with neat designs to improve the User Experience and User Interface" },
        { image: "icons8-source-code-100.png", title: "Web Development", description: "I am passionate about web development. I integrate websites or web applications with modern languages ​​and frameworks." },
        { image: "icons8-personnalisation-windows10-50.png", title: "Design", description: "I do graphic designs, whether it's business cards, posters, invitations, etc..." },
    ]

    const education = [
        { date: "2022 - 2023", description: "Baccalaureate Series C at CSFX Ambatomena Fianarantsoa" },
        { date: "2023 - 2024", description: "1st year of Bachelor's degree in Software Engineering and Database at ENI Tanambao Fianarantsoa" },
        { date: "2024 - 2025", description: "1st year of Bachelor's degree in Software Engineering and Database at ENI Tanambao Fianarantsoa" },
    ]

    const skills = [
        {
            type: "Frontend",
            skills: [
                { names: "HTML", imagesdark: "icons8-html-120 (1).png" ,imageclair:"icons8-html-120.png" },
                { names: "CSS", imagesdark: "icons8-css-150 (1).png",imageclair:"icons8-css-150.png" },
                { names: "JavaScript", imagesdark: "icons8-js-150 (1).png",imageclair:"icons8-js-150.png" },
                { names: "React JS", imagesdark: "icons8-react-96 (1).png",imageclair:"icons8-react-96.png" },
                { names: "Next JS", imagesdark: "icons8-suivantjs-144 (1).png",imageclair:"icons8-suivantjs-144.png" },
                { names: "Tailwind CSS", imagesdark: "icons8-vent-arrièrecss-144 (1).png",imageclair:"icons8-vent-arrièrecss-144.png" },
            ]
        },
        {
            type: "Backend",
            skills: [
                { names: "PHP", imagesdark: "icons8-php-150 (1).png",imageclair:"icons8-php-150.png" },
                { names: "C", imagesdark: "icons8-programmation-en-c-144 (1).png",imageclair:"icon c.png" },
                { names: "C++", imagesdark: "icons8-c++-150.png",imageclair:"icons8-c-100.png" },
            ]
        },
        {
            type: "Databases",
            skills: [
                { names: "MySQL", imagesdark: "icons8-mysql-100 (1).png",imageclair:"icons8-mysql-100.png" },
                { names: "PostgreSQL", imagesdark: "icons8-postgres-150.png",imageclair:"icons8-postgresql-150.png" },
            ]
        },
        {
            type: "Design Tools",
            skills: [
                { names: "Figma", imagesdark: "icons8-figma-144.png",imageclair:"icons8-figma-100.png" },
                { names: "Canva", imagesdark: "icons8-application-canva-150 (1).png",imageclair:"icons8-application-canva-150.png" },
                { names: "Photoshop", imagesdark: "icons8-photoshop-120.png",imageclair:"icons8-photoshop-144.png" },
                { names: "Illustrator", imagesdark: "icons8-adobe-illustrator-144.png",imageclair:"icons8-adobe-illustrator-104.png" },
                { names: "Adobe XD", imagesdark: "icons8-adobe-xd-192 (1).png",imageclair:"icons8-adobe-xd-192.png" },
            ]
        },
        {
            type: "Tools",
            skills: [
                { names: "Git", imagesdark: "icons8-git-150.png",imageclair:"icons8-git-100.png" },
                { names: "GitHub", imagesdark: "icons8-github-120.png",imageclair:"icons8-github-192.png" },
            ]
        },
    ]

    const context = useContext(ActiveSectionContext);
    if (!context) {
        throw new Error("ActiveSectionContext must be used within its provider");
    }
    const { setActiveSection } = context;
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            console.log("Observer triggered:", entries[0].isIntersecting, "Menu open:", isMenuOpen); // Débogage
            if (entries[0].isIntersecting && !isMenuOpen) { // Vérifie si le menu est fermé
                setActiveSection("about");
                window.history.replaceState(null, "", "#about");
            }
        }, {
            threshold: 0.2,
            rootMargin: "-50px 0px"
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [setActiveSection, isMenuOpen]); // Ajoutez isMenuOpen comme dépendance

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section id='about' className={`min-h-screen pt-11 px-4 md:px-8 scroll-mt-20 ${isDarkMode ? 'bg-[#121B17] text-white' : 'bg-[#E6F6EB] text-black'} pb-5`} ref={sectionRef}>
            {/* Ajoutez un gestionnaire pour le menu hamburger */}
            <button
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    console.log("Menu state changed:", !isMenuOpen); // Débogage
                }}
                className="hamburger-menu"
            >
                {/* Icône ou contenu du menu */}
            </button>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-3xl md:text-5xl text-center mb-8 md:mb-12'
            >
                WHAT I DO
            </motion.h1>

            <div className='container mx-auto'>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'
                >
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className={`flex flex-col items-center bg-${isDarkMode ? '[#121B17]' : '[#E6F6EB]'} p-4 md:p-6 rounded-lg shadow-lg transition-transform duration-300 border-2 border-[#2B9A66]`}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className='w-16 h-16 md:w-24 md:h-24 mb-4 md:mb-6'
                            />
                            <h2 className='text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center'>{item.title}</h2>
                            <p className='text-center text-[#2B9A66] leading-relaxed text-sm md:text-base'>
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='text-3xl md:text-5xl text-center mb-8 md:mb-12 mt-10 md:mt-14'
            >
                EDUCATION AND SKILLS
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='container mx-auto max-w-4xl mt-0'
            >
                <h2 className='text-2xl md:text-3xl text-center mb-8 md:mb-12'>
                    Education</h2>
                <div className='space-y-6'>
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`group bg-${isDarkMode ? '[#121B17]' : '[#E6F6EB]'} p-6 rounded-lg shadow-lg border-2 border-[#2B9A66]`}
                        >
                            <div className='flex items-center gap-6'>
                                <div className='flex-shrink-0 w-16 h-16 bg-[#2B9A66] rounded-full flex items-center justify-center'>
                                    <span className='text-white font-bold'>{index + 1}</span>
                                </div>
                                <div className='flex-grow'>
                                    <h3 className='text-xl font-bold text-[#2B9A66] mb-2 group-hover:translate-x-2 transition-transform duration-300'>
                                        {item.date}
                                    </h3>
                                    <p className={`${isDarkMode ? "text-white" : "text-black"} leading-relaxed group-hover:translate-x-2 transition-transform duration-300`}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            <div className='w-0 group-hover:w-full h-0.5 bg-[#2B9A66] mt-4 transition-all duration-300'></div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='container mx-auto max-w-4xl'
            >
                <h2 className='text-2xl md:text-3xl text-center mb-8 md:mb-12 mt-10 md:mt-14'>
                    Skills</h2>
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className={`${
                            isDarkMode ? 'bg-[#121B17]' : 'bg-[#E6F6EB]'
                        } p-4 md:p-6 rounded-lg shadow-lg border-2 border-[#2B9A66] mb-6`}
                    >
                        <h3 className='text-lg md:text-xl font-bold mb-4'>{skill.type}</h3>
                        <div className='overflow-x-auto'>
                            <div className='flex flex-wrap gap-4 md:gap-6'>
                                {skill.skills.map((s, i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col items-center p-3 md:p-4 rounded-lg min-w-[80px] md:min-w-[100px] transition-colors duration-300 ${
                                            isDarkMode
                                                ? 'bg-[#1a2922] hover:bg-[#223528]'
                                                : 'bg-[#f2f9f4] hover:bg-[#d9efe3]'
                                        }`}
                                    >
                                        <img
                                            src={isDarkMode ? s.imagesdark : s.imageclair}
                                            alt={s.names}
                                            className='w-8 h-8 md:w-12 md:h-12 mb-2'
                                        />
                                        <span
                                            className={`text-center text-sm md:text-base whitespace-nowrap ${
                                                isDarkMode ? 'text-white' : 'text-black'
                                            }`}
                                        >
                                            {s.names}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default About