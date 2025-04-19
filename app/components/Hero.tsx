"use client"

import React, { useContext, useEffect, useRef } from 'react'
import { ActiveSectionContext } from '../context/ActiveSectionContext'
import { ThemeContext } from '../context/ThemeContext';

function Hero() {
    const context = useContext(ActiveSectionContext);
    if (!context) {
        throw new Error("ActiveSectionContext must be used within its provider");
    }
    const { isDarkMode } = useContext(ThemeContext)!;
    
    const { setActiveSection } = context;
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setActiveSection("hero");
                window.history.replaceState(null, "", "#hero");
            }
        }, { 
            threshold: 0.5,
            rootMargin: "-100px"
        }); 

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [setActiveSection]);

    const socialMediaIcon =[
        { name: 'LinkedIn', icon: 'icons8-linkedin-120 (1).png',link: 'https://www.linkedin.com/in/elys%C3%A9-razafindravonjy-9355b32b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'GitHub', icon: 'icons8-github-192 (1).png', link: 'https://www.github.com/ElyseRaz' },
        { name: 'Facebook', icon: 'icons8-facebook-nouveau-150 (1).png',link: 'https://web.facebook.com/profile.php?id=61557068973186' },
        { name: 'Gmail', icon: 'icons8-gmail-67.png', link:'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRwRQSWTtWdlRQCmcdXZtSXvrXCcGGbXChwcZdtGQpzlhJVbMbDkTXCvFDHVDzLMtRqCJPML' },
    ]

    return (
        <section 
            id="hero" 
            ref={sectionRef} 
            className={`flex flex-col items-center min-h-[calc(100vh-4rem)]  py-32 scroll-mt-20 px-4'
            ${isDarkMode ? 'bg-[#121B17] text-white' : 'bg-[#E6F6EB] text-black'}`}>
            <h1 
                className='text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-center leading-relaxed motion-preset-slide-right '
                style={{
                    background: 'linear-gradient(to right, #2B9A66, #58CF95)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                RAZAFINDRAVONJY<br className="md:hidden" /> Solofonirina Elysé
            </h1>

            <h3 className='mb-8 motion-preset-slide-left '>
                <span className='text-3xl md:text-5xl font-bold '>Web Developer</span>
            </h3>
            
            <p className='text-xl md:text-2xl max-w-2xl text-center px-4 motion-preset-slide-left'>
                Hello  👋 , My name is Elysé . I'm available for web development projects.
            </p>
            
            <img 
                src="ELYSE.jpg" 
                alt="My Profile" 
                className='w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full object-cover border-4 border-[#2B9A66] mt-8 motion-preset-expand ' 
            />

            <div className='flex gap-4 mt-8 flex-wrap justify-center px-4 motion-preset-expand '>
                {socialMediaIcon.map((icon, index) => (
                    <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
                        <img src={icon.icon} alt={icon.name} className='w-10 h-10 md:w-15 md:h-15 hover:scale-110 transition-transform duration-300' />
                    </a>
                ))}
            </div>
        </section>
    )
}

export default Hero