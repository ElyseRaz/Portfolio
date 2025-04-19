"use client"
import React, { useContext,useState, FormEvent, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDarkMode } = useContext(ThemeContext)!;
  useEffect(() => {
    try {
      emailjs.init('y-eUiPIjf526drm89');
      console.log('EmailJS initialisé avec succès');
    } catch (initError: any) {
      console.error('Erreur d\'initialisation EmailJS:', {
        name: initError.name,
        message: initError.message,
        stack: initError.stack
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            history.pushState({}, '', '#contact');
          }
        });
      },
      { threshold: 0.5 }
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ submitted: true, message: 'Envoi en cours...' });

    try {
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Veuillez remplir tous les champs');
      }

      console.log('Tentative d\'envoi avec les paramètres:', {
        service_id: 'service_ie78bgt',
        template_id: 'template_g84banf',
        user_id: 'y-eUiPIjf526drm89',
        template_params: {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Elysé Razafindravonjy',
          to_email: 'elysesherwin@gmail.com'
        }
      });

      const response = await emailjs.send(
        'service_ie78bgt',
        'template_g84banf',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Elysé Razafindravonjy',
          to_email: 'elysesherwin@gmail.com'
        },
        'y-eUiPIjf526drm89'
      );

      console.log('Réponse EmailJS:', response);

      if (response.status === 200) {
        setStatus({ submitted: false, message: 'Message envoyé avec succès!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(`Erreur avec le statut: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Erreur détaillée:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        status: error.status,
        text: error.text
      });

      setStatus({ 
        submitted: false, 
        message: error.message || 'Une erreur est survenue lors de l\'envoi du message'
      });
    } finally {
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div>
      <section 
        ref={sectionRef}
        id="contact" 
        className={`flex flex-col items-center min-h-[calc(100vh-50px)] text-white pt-16 scroll-mt-20 px-4 -mb-28 ${isDarkMode ? 'bg-[#121B17] text-white' : 'bg-[#E6F6EB] text-black'}`}
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-3xl md:text-5xl font-bold mb-5 text-center'
          style={{
              color: typeof document !== 'undefined' && document.body.classList.contains('light-mode') 
                ? '#2B9A66' 
                : '#2B9A66',
              paddingBottom: '10px'
          }}
        >
          CONTACT
        </motion.h1>
        <h2 className='text-white mb-8 font-semibold text-center max-w-2xl'>
          If you want sites or if you are interested in my profile, do not hesitate to contact me with the form below
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='container mx-auto px-4 lg:px-8 max-w-2xl'
        >
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`p-8 rounded-2xl shadow-2xl backdrop-blur-lg border ${
              isDarkMode 
                ? 'bg-[#121B17] border-gray-800' 
                : 'bg-white border-gray-300'
            }`}
          >
            <div className='mb-6'>
              <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#2B9A66]' : 'text-[#1A652E]'
              }`}>Name</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 outline-none ${
                  isDarkMode 
                    ? 'bg-[#1A2520] border-gray-700 text-white focus:ring-[#2B9A66]' 
                    : 'bg-[#f2f2f2] border-gray-300 text-black focus:ring-[#1A652E]'
                }`}
                placeholder='Enter your name'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#2B9A66]' : 'text-[#1A652E]'
              }`}>Email</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 outline-none ${
                  isDarkMode 
                    ? 'bg-[#1A2520] border-gray-700 text-white focus:ring-[#2B9A66]' 
                    : 'bg-[#f2f2f2] border-gray-300 text-black focus:ring-[#1A652E]'
                }`}
                placeholder='Enter your email'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#2B9A66]' : 'text-[#1A652E]'
              }`}>Message</label>
              <textarea 
                id="message" 
                rows={4} 
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full p-3 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 outline-none resize-none ${
                  isDarkMode 
                    ? 'bg-[#1A2520] border-gray-700 text-white focus:ring-[#2B9A66]' 
                    : 'bg-[#f2f2f2] border-gray-300 text-black focus:ring-[#1A652E]'
                }`}
                placeholder='Write your message here...'
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status.submitted}
              className={`w-full py-3 px-6 rounded-lg font-medium transform hover:scale-[1.02] transition-all duration-300 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
                isDarkMode 
                  ? 'bg-[#2B9A66] text-white hover:bg-[#238555] focus:ring-[#2B9A66]' 
                  : 'bg-[#1A652E] text-white hover:bg-[#145A28] focus:ring-[#1A652E]'
              }`}
            >
              {status.submitted ? 'Envoi en cours...' : 'Send Message'}
            </button>
            {status.message && (
              <p className={`mt-4 text-center ${
                status.message.includes('succès') 
                  ? (isDarkMode ? 'text-green-500' : 'text-green-700') 
                  : (isDarkMode ? 'text-red-500' : 'text-red-700')
              }`}>
                {status.message}
              </p>
            )}
          </motion.form>
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;