import React from 'react'

function Footer() {
  return (
    <footer className="bg-[#2B9A66] text-white py-4 h-28 w-full bottom-0 left-0 flex items-center justify-center">
        <div className="container mx-auto text-center px-4">
            <p className="text-base mb-2">&copy; {new Date().getFullYear()} Razafindravonjy Solofonirina Elysé. All rights reserved.</p>
            <p className="hidden lg:block text-sm sm:text-base md:text-base break-words">Designed and developed by Razafindravonjy Solofonirina Elysé</p>
        </div>
    </footer>
  )
}

export default Footer