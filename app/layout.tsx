

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Noto_Sans_Symbols, Radio_Canada } from 'next/font/google'
import { ActiveSectionContextProvider } from './context/ActiveSectionContext';
import ThemeProvider from './context/ThemeContext';
import emailjs from '@emailjs/browser';

emailjs.init('y-eUiPIjf526drm89');

const noto = Noto_Sans_Symbols({
  subsets: ['latin'],
  weight: ['400'], // modifie si besoin (peut-être seulement 400 dispo)
  variable: '--font-noto',
})

const radioCanada = Radio_Canada({
  subsets: ['latin'],
  variable: '--font-radio',
  weight: ['400', '500', '700'], // adapte selon ton besoin
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Portfolio Elysé Razafindravonjy",
  description: "Portfolio de Elysé Razafindravonjy, développeur web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${noto.variable} ${radioCanada.variable}`}>
        <ThemeProvider>
          <ActiveSectionContextProvider>
            {children}
          </ActiveSectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
